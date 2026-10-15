/**
 * 早期润色示例。不带 --write 只打印格式说明；带 --write 会覆盖 diary/data/2026-10-13.json。
 * 新日记请用 scripts/add-diary.js。
 *
 * 明文 JSON 必须有 title、location、weather。
 * index.json 对应条目必须有 title、excerpt。
 * 列表页读索引里的 title / excerpt；详情页在日期旁显示 location 和 weather。
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

if (!process.argv.includes('--write')) {
  console.log('这个脚本会用文件里的早期示例覆盖 2026-10-13，并改写索引里的这一天。');
  console.log('新日记请用 node scripts/add-diary.js。');
  console.log('明文必须有 title、location、weather；索引必须有 title、excerpt。');
  console.log('列表页读索引的 title / excerpt；详情页在日期旁显示 location 和 weather。');
  console.log('确认要覆盖时再运行：node scripts/update-diary.js --write');
  process.exit(0);
}

// 润色后的日记内容
const password = 'wind9527';
const date = '2026-10-13';

const diaryData = {
  date: '2026-10-13',
  title: '吉隆坡夜里：把日子写进密码里',
  location: '马来西亚 · 吉隆坡',
  weather: '湿热，傍晚雷雨 · 约 24–33°C',
  userProfile: `他是个 94 年 8 月出生的男生，今年三十二岁，身高一米七七，体重七十三公斤，身材保持得还不错。2017 年从陕西科技大学毕业后，就一直在做 Web 前端开发，这一干就是快十年。从他选择的职业和做事方式能看出来，他是那种喜欢动手、爱折腾技术的人，不满足于现状，总想着把东西做得更好。`,
  events: `今天突然想给博客换个新布局，看着现在的页面总觉得哪里不够顺眼。本来想找个现成的模板直接套用，但转念一想，还是决定自己一点一点调试。他就是这样的人，遇到问题更愿意自己动手解决，享受那种一步步改进的过程。

然后他又冒出一个新想法——要不要建一个日记模块？他想的是，如果能每天记录下重要的事情和想法，慢慢地 AI 助手就能越来越了解他这个人。不是那种流水账式的记录，而是真正重要的决策、思考和变化。他对这个想法挺认真的，甚至期待着未来有一天，这个了解他的 AI 助手能帮他分析问题、做出重要决策。听起来有点理想主义，但这种对未来的期待，也挺有意思的。`,
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
console.log(`✓ 润色后的日记已保存: ${diaryFile}`);

// 更新索引：只改这一天，保留其他日期和已有的 passwordTest
const indexPath = path.join(__dirname, '..', 'diary', 'index.json');
const index = fs.existsSync(indexPath)
  ? JSON.parse(fs.readFileSync(indexPath, 'utf8'))
  : { entries: [], passwordTest: '' };

if (!index.passwordTest) {
  index.passwordTest = encryptText('PASSWORD_VALID', password);
}

const entry = {
  date: '2026-10-13',
  file: '2026-10-13.json',
  encrypted: true,
  title: diaryData.title,
  excerpt: '傍晚他停掉套模板，亲手把加密日记做上线。夜深时，迷茫和两段感情的账一起说了出来。'
};
const existingIndex = (index.entries || []).findIndex((item) => item.date === date);
if (existingIndex >= 0) {
  index.entries[existingIndex] = entry;
} else {
  index.entries.push(entry);
  index.entries.sort((a, b) => b.date.localeCompare(a.date));
}

fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
console.log(`✓ 索引已更新: ${indexPath}`);
console.log('\n=== 润色完成 ===');
console.log('\n明文内容：');
console.log(JSON.stringify(diaryData, null, 2));
