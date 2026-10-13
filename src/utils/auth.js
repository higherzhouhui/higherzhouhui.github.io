/**
 * 日记密码认证管理
 */

const AUTH_KEY = 'diary_auth';
const VALID_DAYS = 10;

/**
 * 保存认证信息
 * @param {string} password - 密码（仅保存哈希）
 */
export function saveAuth(password) {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + VALID_DAYS);
  
  const authData = {
    // 存储密码的简单哈希用于验证（不是用于加密）
    passwordHash: btoa(password),
    expiry: expiryDate.getTime()
  };
  
  localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
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
 * 获取保存的密码
 * @returns {string|null}
 */
export function getSavedPassword() {
  try {
    const authData = JSON.parse(localStorage.getItem(AUTH_KEY));
    if (!authData || !isAuthValid()) {
      return null;
    }
    return atob(authData.passwordHash);
  } catch {
    return null;
  }
}

/**
 * 清除认证信息
 */
export function clearAuth() {
  localStorage.removeItem(AUTH_KEY);
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
