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

const password = 'wind9527';
const date = '2026-10-13';

const diaryData = {
  date,
  title: '把博客重新当成屋子来住',
  userProfile: `我是 1994 年夏天在陕西长大的人，现在三十出头。陕科大 2017 年出来以后，就一直在写网页——从上海的路由器厂，到美凯龙的设计云，再到重庆这边自己搭摊子。

身高体重这些数字会变。晚上还是会把没做完的事先在脑子里过一遍，这一点没变。`,
  events: `今天本来想把博客一口气改成「像样」的样子。改着改着发现，还是自己一步步磨更踏实。布局、动效、中英切换，都不是一晚上的事。

另外起了个念头：给自己留一本加密的日记。不是流水账，只记当天真正占地方的事。以后要是有个助手能读懂这些字，至少别每次都从零认识我。

先把锁装上。字可以慢慢写。`,
  images: [],
};

const encryptedContent = encryptText(JSON.stringify(diaryData, null, 2), password);

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
console.log(`✓ 日记已保存: ${diaryFile}`);

const indexPath = path.join(__dirname, '..', 'diary', 'index.json');
const passwordTest = encryptText('PASSWORD_VALID', password);

const index = {
  entries: [
    {
      date,
      file: `${date}.json`,
      encrypted: true,
      title: diaryData.title,
      excerpt: '没一次改完。先把日记锁进抽屉里。',
    },
  ],
  passwordTest,
};

fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
console.log(`✓ 索引已更新: ${indexPath}`);
console.log('\n=== 初始化完成 ===');
