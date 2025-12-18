import React from 'react';
import { Button } from '../components/ui/Button';

export const Admin: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">🔐 管理人専用ページ</h1>
        <p className="text-gray-600 mb-8">
          ここから先は、関係者以外立ち入り禁止です。<br/>
          （認証機能はまだありません）
        </p>
        
        <div className="space-y-4">
           <Button variant="primary" className="w-full" onClick={() => alert('まだログインできません！')}>
             ログインする
           </Button>
           
           {/* トップページに戻るリンク */}
           <a href="/" className="block text-sm text-indigo-600 hover:underline">
             ← サイトに戻る
           </a>
        </div>
      </div>
    </div>
  );
};