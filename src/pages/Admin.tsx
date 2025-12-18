import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Toast } from '../components/ui/Toast';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { CreateAchievementModal } from "../components/admin/CreateAchievementModal";
import { CreateNewsModal } from "../components/admin/CreateNewsModal";

// データ型を定義
type Achievement = {
  id: number;
  title: string;
  hours: number;
  created_at: string;
};
// Newsの型を定義
type NewsItem = {
  id: number;
  title: string;
  content: string;
  published_date: string;
  created_at: string;
};

export const Admin: React.FC = () => {
  const [data, setData] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // モーダル開閉の状態だけ持つ
  const [newsList, setNewsList] = useState<NewsItem[]>([]); // お知らせデータ
  const [showNewsModal, setShowNewsModal] = useState(false); // お知らせモーダル用
  const [editingItem, setEditingItem] = useState<Achievement | null>(null); // 実績編集中のデータ
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null); // お知らせ編集中のデータ
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' as 'success' | 'error' }); // トースト通知用
  const [deleteTarget, setDeleteTarget] = useState<{ id: number, type: 'achievement' | 'news' } | null>(null); // 削除確認通知用
  const navigate = useNavigate();

  // 1. ログインチェック
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") navigate("/login");
  }, [navigate]);

  // 2. データ取得
  const fetchData = () => {
    setLoading(true);
    Promise.all([
      fetch("/api/achievements").then((res) => res.json()),
      fetch("/api/news").then((res) => res.json()),
    ])
      .then(([achievementsData, newsData]) => {
        setData(achievementsData); // 業務削減実績データ
        setNewsList(newsData); // お知らせデータ
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  // トーストを表示関数
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, message, type });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 実績編集ボタンを押した時
  const handleEdit = (item: Achievement) => {
    setEditingItem(item); // 編集したいデータをセット
    setShowModal(true); // モーダルを開く
  };

  // 実績モーダルを閉じる時（編集状態もリセット）
  const handleCloseModal = () => {
    setEditingItem(null); // クリア
    setShowModal(false); // 閉じる
  };

  // お知らせ編集ボタンを押した時
  const handleEditNews = (item: NewsItem) => {
    setEditingNews(item);
    setShowNewsModal(true);
  };

  // お知らせモーダルを閉じる時
  const handleCloseNewsModal = () => {
    setEditingNews(null);
    setShowNewsModal(false);
  };

  // 実績削除ボタン
  const confirmDeleteAchievement = (id: number) => {
    setDeleteTarget({ id, type: 'achievement' }); // 削除対象をセットしてダイアログを開く
  };

  // お知らせ削除ボタン
  const confirmDeleteNews = (id: number) => {
    setDeleteTarget({ id, type: 'news' });
  };

  // 実際に削除を実行する関数
  const executeDelete = async () => {
    if (!deleteTarget) return;

    const url = deleteTarget.type === 'achievement'
      ? '/api/achievements/delete'
      : '/api/news/delete';

    try {
      const res = await fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: deleteTarget.id }),
      });

      if (res.ok) {
        showToast('削除しました！', 'success');
        fetchData(); // リスト更新
      } else {
        showToast('削除に失敗しました', 'error');
      }
    } catch (err) {
      showToast('通信エラーが発生しました', 'error');
    } finally {
      setDeleteTarget(null); // ダイアログを閉じる
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 relative">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            🔐 管理人ダッシュボード
          </h1>
          <div className="flex gap-4 items-center">
            <a href="/" className="text-indigo-600 hover:underline text-sm">
              サイトに戻る
            </a>
            <Button
              variant="secondary"
              onClick={handleLogout}
              className="py-2 px-4 text-sm"
            >
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
                      <td className="p-3 font-bold text-gray-800">
                        {item.title}
                      </td>
                      <td className="p-3">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-bold">
                          {item.hours} 時間
                        </span>
                      </td>
                      <td className="p-3 text-gray-400 text-sm">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-3 flex gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 px-3 py-1 rounded transition-colors text-sm font-bold"
                        >
                          編集
                        </button>

                        <button
                          onClick={() => confirmDeleteAchievement(item.id)}
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
        <div className="bg-white rounded-xl shadow-md p-6 mt-8">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-xl font-bold">📢 お知らせ管理</h2>
            <Button variant="primary" onClick={() => setShowNewsModal(true)}>
              ＋ 投稿
            </Button>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 font-bold text-gray-600">日付</th>
                <th className="p-3 font-bold text-gray-600">タイトル</th>
                <th className="p-3 font-bold text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody>
              {newsList.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 text-gray-500">
                    {new Date(item.published_date).toLocaleDateString()}
                  </td>
                  <td className="p-3 font-bold text-gray-800">{item.title}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleEditNews(item)}
                      className="text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 px-3 py-1 rounded transition-colors text-sm font-bold"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => confirmDeleteNews(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-bold"
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CreateNewsModal
          isOpen={showNewsModal}
          onClose={handleCloseNewsModal}
          onSuccess={() => {
            fetchData();
            showToast('お知らせを保存しました！');
          }}
          initialData={editingNews}
        />
      </div>

      <CreateAchievementModal
        isOpen={showModal}
        onSuccess={() => {
          fetchData();
          showToast('実績を保存しました！');
        }}
        onClose={handleCloseModal}
        initialData={editingItem}
      />

      <Toast
        isVisible={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="削除の確認"
        message="本当にこのデータを削除してもよろしいですか？この操作は取り消せません。"
        onConfirm={executeDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
