/**
 * 生成初始示例日记（非交互式）
 */

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SALT = 'diary-salt-v1';
const ITERATIONS = 100000;
const KEY_LENGTH = 32;
const IV_LENGTH = 12;

function deriveKey(password) {
  return crypto.pbkdf2Sync(password, SALT, ITERATIONS, KEY_LENGTH, 'sha256');
}

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

// 初始示例日记数据
const password = 'wind9527';
const date = '2026-10-13';

const diaryData = {
  date: '2026-10-13',
  userProfile: `用户基础画像：
- 性别：男
- 出生日期：1994年8月12日（32岁）
- 身高：177cm
- 体重：73kg
- 教育背景：2017年毕业于陕西科技大学
- 职业：Web 前端开发工程师（从业至今）`,
  events: `今天的重要事项：
1. 考虑重新设计博客布局，但最终决定自己一步步调试，逐步完善
2. 提出建立加密日记模块的想法
3. 希望通过日记让 AI 助手更了解自己，建立长期的理解和信任
4. 期望未来 AI 助手能够基于对自己的深入了解，帮助做出重要决策`,
  images: []
};

const encryptedContent = encryptText(JSON.stringify(diaryData, null, 2), password);

// 创建目录
const diaryDir = path.join(__dirname, '..', 'diary', 'data');
const imagesDir = path.join(__dirname, '..', 'diary', 'images');

if (!fs.existsSync(diaryDir)) {
  fs.mkdirSync(diaryDir, { recursive: true });
}
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// 保存日记
const diaryFile = path.join(diaryDir, `${date}.json`);
fs.writeFileSync(diaryFile, JSON.stringify({ encrypted: encryptedContent }, null, 2));
console.log(`✓ 示例日记已保存: ${diaryFile}`);

// 更新索引
const indexPath = path.join(__dirname, '..', 'diary', 'index.json');
const passwordTest = encryptText('PASSWORD_VALID', password);

const index = {
  entries: [
    {
      date: '2026-10-13',
      file: '2026-10-13.json',
      encrypted: true
    }
  ],
  passwordTest
};

fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
console.log(`✓ 索引已更新: ${indexPath}`);
console.log('\n=== 初始化完成 ===');
