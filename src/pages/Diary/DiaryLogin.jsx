import { useState } from 'react';
import { verifyPassword } from '../../utils/crypto';
import { saveAuth } from '../../utils/auth';
import './DiaryLogin.css';

export default function DiaryLogin({ onLoginSuccess, passwordTest }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const isValid = await verifyPassword(password, passwordTest);
      if (isValid) {
        saveAuth(password);
        onLoginSuccess(password);
      } else {
        setError('密码错误，请重试');
      }
    } catch (err) {
      setError('验证失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="diary-login-container">
      <div className="diary-login-box">
        <div className="diary-login-header">
          <h2>🔒 日记本</h2>
          <p>请输入密码访问私密日记</p>
        </div>
        
        <form onSubmit={handleSubmit} className="diary-login-form">
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
              className="form-control"
              autoFocus
              disabled={loading}
            />
          </div>
          
          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}
          
          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={loading || !password}
          >
            {loading ? '验证中...' : '解锁'}
          </button>
          
          <div className="diary-login-footer">
            <small>密码验证后有效期为 10 天</small>
          </div>
        </form>
      </div>
    </div>
  );
}
