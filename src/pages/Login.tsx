import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 画面遷移用
import { Button } from '../components/ui/Button';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        // 成功したら、ローカルストレージに「合言葉」を保存
        localStorage.setItem('isAdmin', 'true');
        // 管理画面へジャンプ！
        navigate('/admin');
      } else {
        setError('IDまたはパスワードが違います');
      }
    } catch (err) {
      setError('エラーが発生しました');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center mb-6">🔑 管理人ログイン</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">ユーザーID</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">パスワード</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button type="submit" variant="primary" className="w-full">
            ログイン
          </Button>
        </form>

        <div className="mt-4 text-center">
          <a href="/" className="text-sm text-gray-500 hover:text-indigo-600">← サイトに戻る</a>
        </div>
      </div>
    </div>
  );
};