/**
 * 加密解密工具函数
 * 使用 PBKDF2 派生密钥，AES-GCM 加密数据
 */

const SALT = 'diary-salt-v1';
const ITERATIONS = 100000;
const KEY_LENGTH = 256;

const IDB_NAME = 'diary-crypto-v1';
const IDB_STORE = 'keys';
const IDB_KEY_ID = 'aes-gcm-256';

/** @type {CryptoKey | null} */
let memoryKeyCache = null;

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
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: KEY_LENGTH },
    false,
    ['encrypt', 'decrypt']
  );
}

function openKeyDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(IDB_NAME, 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE);
      }
    };
  });
}

async function loadKeyFromIndexedDB() {
  try {
    const db = await openKeyDatabase();
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const store = tx.objectStore(IDB_STORE);
      const request = store.get(IDB_KEY_ID);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result ?? null);
    });
  } catch {
    return null;
  }
}

async function saveKeyToIndexedDB(key) {
  try {
    const db = await openKeyDatabase();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      const store = tx.objectStore(IDB_STORE);
      const request = store.put(key, IDB_KEY_ID);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  } catch {
    // IndexedDB unavailable — in-memory cache still works for this tab
  }
}

async function clearKeyFromIndexedDB() {
  try {
    const db = await openKeyDatabase();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      const store = tx.objectStore(IDB_STORE);
      const request = store.delete(IDB_KEY_ID);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  } catch {
    // ignore
  }
}

/**
 * 返回内存或 IndexedDB 中已缓存的密钥（不派生）
 * @returns {Promise<CryptoKey | null>}
 */
export async function getCachedKey() {
  if (memoryKeyCache) return memoryKeyCache;
  const fromIdb = await loadKeyFromIndexedDB();
  if (fromIdb) {
    memoryKeyCache = fromIdb;
    return fromIdb;
  }
  return null;
}

/**
 * 派生或复用缓存的 CryptoKey（PBKDF2 仅在首次成功解锁时运行）
 * @param {string} password
 * @returns {Promise<CryptoKey>}
 */
export async function getOrDeriveKey(password) {
  const cached = await getCachedKey();
  if (cached) return cached;

  const key = await deriveKey(password);
  memoryKeyCache = key;
  await saveKeyToIndexedDB(key);
  return key;
}

/**
 * 清除密钥缓存（登出时调用）
 */
export async function clearKeyCache() {
  memoryKeyCache = null;
  await clearKeyFromIndexedDB();
}

/**
 * @param {string | CryptoKey} passwordOrKey
 * @returns {Promise<CryptoKey>}
 */
async function resolveKey(passwordOrKey) {
  if (passwordOrKey instanceof CryptoKey) {
    return passwordOrKey;
  }
  if (typeof passwordOrKey === 'string' && passwordOrKey) {
    return getOrDeriveKey(passwordOrKey);
  }
  const cached = await getCachedKey();
  if (cached) return cached;
  throw new Error('需要密码或已缓存的密钥');
}

/**
 * Base64 解码为 Uint8Array（大块时分片，避免长时间阻塞主线程）
 * @param {string} base64
 * @param {boolean} [yieldToMain]
 */
async function base64ToBytes(base64, yieldToMain = false) {
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  const chunkSize = 256 * 1024;

  for (let offset = 0; offset < len; offset += chunkSize) {
    const end = Math.min(offset + chunkSize, len);
    for (let i = offset; i < end; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    if (yieldToMain && end < len) {
      await new Promise((r) => setTimeout(r, 0));
    }
  }
  return bytes;
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
  const key = await getOrDeriveKey(password);
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const encryptedData = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data);

  const combined = new Uint8Array(iv.length + encryptedData.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(encryptedData), iv.length);

  return btoa(String.fromCharCode(...combined));
}

/**
 * 解密文本
 * @param {string} encryptedText - Base64 编码的加密数据
 * @param {string | CryptoKey} [passwordOrKey] - 密码或已派生的密钥
 * @returns {Promise<string>} 解密后的文本
 */
export async function decryptText(encryptedText, passwordOrKey) {
  const combined = await base64ToBytes(encryptedText);
  const iv = combined.slice(0, 12);
  const data = combined.slice(12);

  const key = await resolveKey(passwordOrKey);

  try {
    const decryptedData = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data);

    const decoder = new TextDecoder();
    return decoder.decode(decryptedData);
  } catch {
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
  const key = await getOrDeriveKey(password);
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const encryptedData = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, imageData);

  const combined = new Uint8Array(iv.length + encryptedData.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(encryptedData), iv.length);

  return btoa(String.fromCharCode(...combined));
}

/**
 * 解密图片
 * @param {string} encryptedData - Base64 编码的加密数据
 * @param {string | CryptoKey} [passwordOrKey] - 密码或已派生的密钥
 * @returns {Promise<ArrayBuffer>} 解密后的图片数据
 */
export async function decryptImage(encryptedData, passwordOrKey) {
  const combined = await base64ToBytes(encryptedData, true);
  const iv = combined.slice(0, 12);
  const data = combined.slice(12);

  const key = await resolveKey(passwordOrKey);

  try {
    return await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data);
  } catch {
    throw new Error('解密图片失败');
  }
}

/**
 * 验证密码是否正确（成功后会缓存派生密钥）
 * @param {string} password - 密码
 * @param {string} testEncrypted - 用于测试的加密数据
 * @returns {Promise<boolean>} 密码是否正确
 */
export async function verifyPassword(password, testEncrypted) {
  try {
    const key = await deriveKey(password);
    await decryptText(testEncrypted, key);
    memoryKeyCache = key;
    await saveKeyToIndexedDB(key);
    return true;
  } catch {
    return false;
  }
}
