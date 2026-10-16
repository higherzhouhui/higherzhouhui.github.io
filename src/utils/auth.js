/**
 * 日记会话认证管理（不保存明文口令；密钥由 crypto 模块缓存在内存与 IndexedDB）
 */

import { clearKeyCache, getOrDeriveKey } from './crypto.js';

const AUTH_KEY = 'diary_auth';
const VALID_DAYS = 10;

/**
 * 保存会话标记（10 天内视为已解锁）
 */
export function saveAuth() {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + VALID_DAYS);

  const authData = {
    session: true,
    expiry: expiryDate.getTime(),
  };

  localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
}

/**
 * 从旧版 localStorage（含 btoa 口令）迁移到仅会话 + IndexedDB 密钥
 * @returns {Promise<boolean>} 是否成功恢复会话
 */
export async function migrateLegacyAuthIfNeeded() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return false;

    const authData = JSON.parse(raw);
    if (!authData?.passwordHash || !isAuthValid()) {
      return false;
    }

    const password = atob(authData.passwordHash);
    await getOrDeriveKey(password);
    saveAuth();
    return true;
  } catch {
    clearAuth();
    return false;
  }
}

/**
 * 检查认证是否有效
 * @returns {boolean}
 */
export function isAuthValid() {
  try {
    const authData = JSON.parse(localStorage.getItem(AUTH_KEY));
    if (!authData) return false;

    const now = Date.now();
    return now < authData.expiry;
  } catch {
    return false;
  }
}

/**
 * 清除认证信息与密钥缓存
 */
export async function clearAuth() {
  localStorage.removeItem(AUTH_KEY);
  await clearKeyCache();
}

/**
 * 获取认证剩余天数
 * @returns {number}
 */
export function getRemainingDays() {
  try {
    const authData = JSON.parse(localStorage.getItem(AUTH_KEY));
    if (!authData) return 0;

    const now = Date.now();
    const remaining = authData.expiry - now;
    return Math.ceil(remaining / (1000 * 60 * 60 * 24));
  } catch {
    return 0;
  }
}
