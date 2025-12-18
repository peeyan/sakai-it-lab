import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { CreateAchievementModal } from '../components/admin/CreateAchievementModal'; // 追加

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
  const [showModal, setShowModal] = useState(false); // モーダル開閉の状態だけ持つ
  const navigate = useNavigate();

  // 1. ログインチェック
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') navigate('/login');
  }, [navigate]);

  // 2. データ取得
  const fetchData = () => {
    setLoading(true);
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ▼ 削除機能を追加
  const handleDelete = async (id: number) => {
    // うっかり削除防止の確認ダイアログ
    if (!confirm('本当に削除してもよろしいですか？')) return;

    try {
      const res = await fetch('/api/delete-achievement', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        alert('削除しました');
        fetchData(); // リストを更新
      } else {
        alert('削除に失敗しました');
      }
    } catch (err) {
      alert('通信エラーです');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 relative">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">🔐 管理人ダッシュボード</h1>
          <div className="flex gap-4 items-center">
             <a href="/" className="text-indigo-600 hover:underline text-sm">サイトに戻る</a>
             <Button variant="secondary" onClick={handleLogout} className="py-2 px-4 text-sm">
               ログアウト
             </Button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-xl font-bold">📊 業務削減の実績リスト</h2>
            {/* ボタンを押したら showModal を true にするだけ */}
            <Button variant="primary" onClick={() => setShowModal(true)}>
              ＋ 新規追加
            </Button>
          </div>

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
                    <th className="p-3 font-bold text-gray-600">操作</th>
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
                      <td className="p-3">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded transition-colors text-sm font-bold"
                        >
                          削除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <CreateAchievementModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchData}
      />

    </div>
  );
};