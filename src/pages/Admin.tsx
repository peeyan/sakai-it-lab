import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

// データ型を定義
type Achievement = {
  id: number;
  title: string;
  hours: number;
  created_at: string;
};

export const Admin: React.FC = () => {
  const [data, setData] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ▼▼▼ 1. ログインチェック ▼▼▼
  useEffect(() => {
    // "アカウント情報" を持っていない人は、ログイン画面に強制送還！
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      navigate('/login');
    }
  }, [navigate]);
  // ▲▲▲ ここまで ▲▲▲

  // 画面が開かれた時にAPIからデータを取得する
  useEffect(() => {
    fetch('/api/achievements')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // ▼▼▼ 2. ログアウト処理 ▼▼▼
  const handleLogout = () => {
    // アカウント情報を捨てる
    localStorage.removeItem('isAdmin');
    // ログイン画面に戻る
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">🔐 管理人ダッシュボード</h1>

          <div className="flex gap-4 items-center">
             <a href="/" className="text-indigo-600 hover:underline text-sm">サイトに戻る</a>
             {/* ログアウトボタン */}
             <Button variant="secondary" onClick={handleLogout} className="py-2 px-4 text-sm">
               ログアウト
             </Button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">📊 業務削減の実績リスト</h2>

          {loading ? (
            <p className="text-gray-500">読み込み中...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 font-bold text-gray-600">ID</th>
                    <th className="p-3 font-bold text-gray-600">案件名</th>
                    <th className="p-3 font-bold text-gray-600">削減時間</th>
                    <th className="p-3 font-bold text-gray-600">登録日</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id} className="border-t hover:bg-gray-50">
                      <td className="p-3 text-gray-500">#{item.id}</td>
                      <td className="p-3 font-bold text-gray-800">{item.title}</td>
                      <td className="p-3">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-bold">
                          {item.hours} 時間
                        </span>
                      </td>
                      <td className="p-3 text-gray-400 text-sm">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6 pt-4 border-t text-right">
             <Button variant="primary" onClick={() => alert('追加機能はまた次回！')}>
               新規追加する（未実装）
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
};