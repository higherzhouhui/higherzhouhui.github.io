/**
 * 生成加密日记数据的 Node.js 脚本
 * 使用方法: node scripts/add-diary.js
 */

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SALT = 'diary-salt-v1';
const ITERATIONS = 100000;
const KEY_LENGTH = 32;
const IV_LENGTH = 12;

/**
 * 从密码派生密钥
 */
function deriveKey(password) {
  return crypto.pbkdf2Sync(
    password,
    SALT,
    ITERATIONS,
    KEY_LENGTH,
    'sha256'
  );
}

/**
 * 加密文本
 */
function encryptText(text, password) {
  const key = deriveKey(password);
  const iv = crypto.randomBytes(IV_LENGTH);
  
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  let encrypted = cipher.update(text, 'utf8');
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  const authTag = cipher.getAuthTag();
  
  const combined = Buffer.concat([iv, encrypted, authTag]);
  return combined.toString('base64');
}

/**
 * 加密图片文件
 */
function encryptImage(imagePath, password) {
  const imageData = fs.readFileSync(imagePath);
  const key = deriveKey(password);
  const iv = crypto.randomBytes(IV_LENGTH);
  
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  let encrypted = cipher.update(imageData);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  const authTag = cipher.getAuthTag();
  
  const combined = Buffer.concat([iv, encrypted, authTag]);
  return combined.toString('base64');
}

/**
 * 读取多行输入
 */
async function readMultiline(prompt) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log(prompt);
  console.log('(输入完成后，单独一行输入 END 结束)');
  
  return new Promise((resolve) => {
    const lines = [];
    rl.on('line', (line) => {
      if (line.trim() === 'END') {
        rl.close();
        resolve(lines.join('\n'));
      } else {
        lines.push(line);
      }
    });
  });
}

/**
 * 读取单行输入
 */
async function readLine(prompt) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

/**
 * 主函数
 */
async function main() {
  console.log('=== 添加新日记 ===\n');
  
  // 读取密码
  const password = await readLine('请输入日记密码（默认: wind9527）: ') || 'wind9527';
  
  // 读取日期
  const today = new Date().toISOString().split('T')[0];
  const date = await readLine(`日期 (YYYY-MM-DD，默认今天 ${today}): `) || today;
  
  // 读取用户画像
  const userProfile = await readMultiline('\n请输入用户画像描述:');
  
  // 读取重要事项
  const events = await readMultiline('\n请输入今天的重要事项:');
  
  // 读取图片路径（可选）
  const imagePaths = await readLine('\n图片路径（多个用逗号分隔，留空则无图片）: ');
  
  const images = [];
  if (imagePaths.trim()) {
    const paths = imagePaths.split(',').map(p => p.trim());
    for (const imgPath of paths) {
      if (fs.existsSync(imgPath)) {
        const encryptedImage = encryptImage(imgPath, password);
        const imageName = path.basename(imgPath);
        const encryptedName = `${date}_${Date.now()}_${imageName}`;
        images.push({
          name: encryptedName,
          data: encryptedImage
        });
        console.log(`✓ 图片已加密: ${imageName}`);
      } else {
        console.log(`✗ 图片不存在: ${imgPath}`);
      }
    }
  }
  
  // 构建日记数据
  const diaryData = {
    date,
    userProfile,
    events,
    images: images.map(img => img.name)
  };
  
  // 加密日记内容
  const encryptedContent = encryptText(JSON.stringify(diaryData, null, 2), password);
  
  // 保存加密的日记文件
  const diaryDir = path.join(__dirname, '..', 'diary', 'data');
  const imagesDir = path.join(__dirname, '..', 'diary', 'images');
  
  if (!fs.existsSync(diaryDir)) {
    fs.mkdirSync(diaryDir, { recursive: true });
  }
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  
  const diaryFile = path.join(diaryDir, `${date}.json`);
  fs.writeFileSync(diaryFile, JSON.stringify({ encrypted: encryptedContent }, null, 2));
  console.log(`\n✓ 日记已保存: ${diaryFile}`);
  
  // 保存加密的图片
  for (const img of images) {
    const imgFile = path.join(imagesDir, img.name);
    fs.writeFileSync(imgFile, JSON.stringify({ encrypted: img.data }, null, 2));
    console.log(`✓ 图片已保存: ${imgFile}`);
  }
  
  // 更新索引
  const indexPath = path.join(__dirname, '..', 'diary', 'index.json');
  let index = { entries: [], passwordTest: '' };
  
  if (fs.existsSync(indexPath)) {
    index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  }
  
  // 如果还没有 passwordTest，生成一个
  if (!index.passwordTest || index.passwordTest === 'PLACEHOLDER_WILL_BE_GENERATED') {
    index.passwordTest = encryptText('PASSWORD_VALID', password);
  }
  
  // 检查日期是否已存在
  const existingIndex = index.entries.findIndex(e => e.date === date);
  if (existingIndex >= 0) {
    index.entries[existingIndex] = {
      date,
      file: `${date}.json`,
      encrypted: true
    };
    console.log(`\n✓ 已更新现有日期 ${date} 的日记`);
  } else {
    index.entries.push({
      date,
      file: `${date}.json`,
      encrypted: true
    });
    // 按日期降序排序
    index.entries.sort((a, b) => b.date.localeCompare(a.date));
    console.log(`\n✓ 已添加新日记到索引`);
  }
  
  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
  console.log(`✓ 索引已更新: ${indexPath}\n`);
  
  console.log('=== 完成 ===');
}

main().catch(console.error);
