import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';

// 扱うデータの型
type ProjectData = {
  id?: number;
  client_name: string;
  project_name: string;
  status: string;
  budget: number;
  deadline: string;
  memo: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (msg: string) => void; // メッセージを親に渡す
  initialData?: ProjectData | null;
};

export const CreateProjectModal: React.FC<Props> = ({ isOpen, onClose, onSuccess, initialData }) => {
  const [formData, setFormData] = useState<ProjectData>({
    client_name: '',
    project_name: '',
    status: '未対応',
    budget: 0,
    deadline: '',
    memo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // モーダルが開くたびにデータをセット
  useEffect(() => {
    if (initialData) {
      // 編集モード（日付の形式合わせに注意）
      setFormData({
        ...initialData,
        deadline: initialData.deadline ? new Date(initialData.deadline).toISOString().split('T')[0] : ''
      });
    } else {
      // 新規モード
      setFormData({
        client_name: '',
        project_name: '',
        status: '未対応',
        budget: 0,
        deadline: '',
        memo: ''
      });
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isEditMode = !!initialData;
    const url = isEditMode ? '/api/projects/update' : '/api/projects/add';
    const method = isEditMode ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        onSuccess(isEditMode ? '案件を更新しました！' : '案件を登録しました！');
        onClose();
      } else {
        alert('エラーが発生しました');
      }
    } catch (err) {
      alert('通信エラーです');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[70]">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">
          {initialData ? '✏️ 案件情報の編集' : '📁 新規案件の登録'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">顧客名</label>
              <input
                name="client_name" type="text" required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.client_name} onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">案件名</label>
              <input
                name="project_name" type="text" required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.project_name} onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">ステータス</label>
              <select
                name="status"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                value={formData.status} onChange={handleChange}
              >
                <option value="未対応">未対応</option>
                <option value="見積中">見積中</option>
                <option value="作業中">作業中</option>
                <option value="確認中">確認中</option>
                <option value="完了">完了</option>
                <option value="保留">保留</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">受注金額 (円)</label>
              <input
                name="budget" type="number"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.budget} onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">納期</label>
            <input
              name="deadline" type="date"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.deadline} onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">詳細メモ</label>
            <textarea
              name="memo" rows={3}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.memo} onChange={handleChange}
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg">キャンセル</button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>保存する</Button>
          </div>
        </form>
      </div>
    </div>
  );
};