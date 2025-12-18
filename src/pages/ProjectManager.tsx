import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { CreateProjectModal } from '../components/admin/CreateProjectModal';
import { Toast } from '../components/ui/Toast';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';

type Project = {
  id: number;
  client_name: string;
  project_name: string;
  status: string;
  budget: number;
  deadline: string;
  memo: string;
};

export const ProjectManager: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // モーダル・ダイアログ・トーストの状態管理
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success' as 'success' | 'error'
  });

  // 1. ログインチェック
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') navigate('/login');
    fetchProjects();
  }, [navigate]);

  // 2. データ取得
  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 3. 削除実行
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch('/api/projects/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: deleteId }),
      });
      showToast('案件を削除しました');
      fetchProjects();
    } catch (err) {
      showToast('削除に失敗しました', 'error');
    } finally {
      setDeleteId(null);
    }
  };

  // トースト表示関数
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, message, type });
  };

  // ステータスごとの色分けバッジ
  const getStatusBadge = (status: string) => {
    const colors: {[key: string]: string} = {
      '未対応': 'bg-gray-100 text-gray-600',
      '見積中': 'bg-blue-100 text-blue-800',
      '作業中': 'bg-yellow-100 text-yellow-800',
      '完了': 'bg-green-100 text-green-800',
      '保留': 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-bold ${colors[status] || 'bg-gray-100'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* ヘッダーエリア */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">📁 案件管理システム (Mini Kintone)</h1>
            <p className="text-gray-500 mt-1">プロジェクトの進捗と売上を一元管理</p>
          </div>
          <div className="flex gap-3">
             <Button variant="secondary" onClick={() => navigate('/admin')}>
               ← 管理画面に戻る
             </Button>
             <Button variant="primary" onClick={() => { setEditingProject(null); setShowModal(true); }}>
               ＋ 新規案件
             </Button>
          </div>
        </div>

        {/* テーブルエリア */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">読み込み中...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="p-4 font-bold text-gray-600 text-sm">ステータス</th>
                    <th className="p-4 font-bold text-gray-600 text-sm">顧客名 / 案件名</th>
                    <th className="p-4 font-bold text-gray-600 text-sm">金額</th>
                    <th className="p-4 font-bold text-gray-600 text-sm">納期</th>
                    <th className="p-4 font-bold text-gray-600 text-sm text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {projects.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">{getStatusBadge(p.status)}</td>
                      <td className="p-4">
                        <div className="font-bold text-gray-900">{p.client_name}</div>
                        <div className="text-sm text-gray-500">{p.project_name}</div>
                      </td>
                      <td className="p-4 font-mono font-medium">
                        ¥{p.budget.toLocaleString()}
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        {p.deadline ? new Date(p.deadline).toLocaleDateString() : '-'}
                      </td>
                      <td className="p-4 text-right flex justify-end gap-2">
                        <button 
                          onClick={() => { setEditingProject(p); setShowModal(true); }}
                          className="text-indigo-600 hover:bg-indigo-50 px-3 py-1 rounded text-sm font-bold"
                        >
                          編集
                        </button>
                        <button 
                          onClick={() => setDeleteId(p.id)}
                          className="text-red-500 hover:bg-red-50 px-3 py-1 rounded text-sm font-bold"
                        >
                          削除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {projects.length === 0 && (
                <div className="p-8 text-center text-gray-400">案件データがありません</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 各種部品の配置 */}
      <CreateProjectModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={(msg) => { fetchProjects(); showToast(msg); }}
        initialData={editingProject}
      />

      <ConfirmDialog
        isOpen={!!deleteId}
        title="案件削除の確認"
        message="本当にこの案件データを削除しますか？"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />

      <Toast
        isVisible={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
};