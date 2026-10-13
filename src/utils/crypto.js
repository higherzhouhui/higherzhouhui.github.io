/**
 * 加密解密工具函数
 * 使用 PBKDF2 派生密钥，AES-GCM 加密数据
 */

const SALT = 'diary-salt-v1';
const ITERATIONS = 100000;
const KEY_LENGTH = 256;

/**
 * 从密码派生加密密钥
 */
async function deriveKey(password) {
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);
  const saltBuffer = encoder.encode(SALT);
  
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );
  
  return await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: saltBuffer,
      iterations: ITERATIONS,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: KEY_LENGTH },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * 加密文本
 * @param {string} text - 要加密的文本
 * @param {string} password - 密码
 * @returns {Promise<string>} Base64 编码的加密数据
 */
export async function encryptText(text, password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const key = await deriveKey(password);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  
  const encryptedData = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  );
  
  const combined = new Uint8Array(iv.length + encryptedData.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(encryptedData), iv.length);
  
  return btoa(String.fromCharCode(...combined));
}

/**
 * 解密文本
 * @param {string} encryptedText - Base64 编码的加密数据
 * @param {string} password - 密码
 * @returns {Promise<string>} 解密后的文本
 */
export async function decryptText(encryptedText, password) {
  const combined = Uint8Array.from(atob(encryptedText), c => c.charCodeAt(0));
  const iv = combined.slice(0, 12);
  const data = combined.slice(12);
  
  const key = await deriveKey(password);
  
  try {
    const decryptedData = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    );
    
    const decoder = new TextDecoder();
    return decoder.decode(decryptedData);
  } catch (error) {
    throw new Error('解密失败，密码可能不正确');
  }
}

/**
 * 加密图片（ArrayBuffer）
 * @param {ArrayBuffer} imageData - 图片数据
 * @param {string} password - 密码
 * @returns {Promise<string>} Base64 编码的加密数据
 */
export async function encryptImage(imageData, password) {
  const key = await deriveKey(password);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  
  const encryptedData = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    imageData
  );
  
  const combined = new Uint8Array(iv.length + encryptedData.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(encryptedData), iv.length);
  
  return btoa(String.fromCharCode(...combined));
}

/**
 * 解密图片
 * @param {string} encryptedData - Base64 编码的加密数据
 * @param {string} password - 密码
 * @returns {Promise<ArrayBuffer>} 解密后的图片数据
 */
export async function decryptImage(encryptedData, password) {
  const combined = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
  const iv = combined.slice(0, 12);
  const data = combined.slice(12);
  
  const key = await deriveKey(password);
  
  try {
    return await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    );
  } catch (error) {
    throw new Error('解密图片失败');
  }
}

/**
 * 验证密码是否正确
 * @param {string} password - 密码
 * @param {string} testEncrypted - 用于测试的加密数据
 * @returns {Promise<boolean>} 密码是否正确
 */
export async function verifyPassword(password, testEncrypted) {
  try {
    await decryptText(testEncrypted, password);
    return true;
  } catch {
    return false;
  }
}
