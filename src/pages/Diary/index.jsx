import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import DiaryLogin from './DiaryLogin';
import DiaryList from './DiaryList';
import DiaryDetail from './DiaryDetail';
import { isAuthValid, getSavedPassword } from '../../utils/auth';

export default function DiaryIndex() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [indexData, setIndexData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIndexData();
  }, []);

  const loadIndexData = async () => {
    try {
      const response = await fetch('/diary/index.json');
      const data = await response.json();
      setIndexData(data);

      // 检查是否已登录
      if (isAuthValid()) {
        const savedPassword = getSavedPassword();
        if (savedPassword) {
          setPassword(savedPassword);
          setAuthenticated(true);
        }
      }
    } catch (err) {
      console.error('加载日记索引失败:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (pwd) => {
    setPassword(pwd);
    setAuthenticated(true);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        加载中...
      </div>
    );
  }

  if (!indexData) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <p>日记数据加载失败</p>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <DiaryLogin 
        onLoginSuccess={handleLoginSuccess}
        passwordTest={indexData.passwordTest}
      />
    );
  }

  return (
    <Routes>
      <Route index element={<DiaryList entries={indexData.entries} />} />
      <Route path=":date" element={<DiaryDetail password={password} />} />
    </Routes>
  );
}
