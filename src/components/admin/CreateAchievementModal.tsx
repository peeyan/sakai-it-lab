import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';

// 扱うデータの形
type AchievementData = {
  id?: number;
  title: string;
  hours: number | string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: AchievementData | null;
};

export const CreateAchievementModal: React.FC<Props> = ({ isOpen, onClose, onSuccess, initialData }) => {
  const [title, setTitle] = useState('');
  const [hours, setHours] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // モーダルが開くたびに、中身をセットする
  useEffect(() => {
    if (initialData) {
      // 編集モードなら、元データを入力欄に入れる
      setTitle(initialData.title);
      setHours(String(initialData.hours));
    } else {
      // 新規モードなら、空欄にする
      setTitle('');
      setHours('');
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 編集モードか新規モードかで、宛先(URL)とメソッドを変える
    const isEditMode = !!initialData;
    const url = '/api/achievement';
    const method = isEditMode ? 'PUT' : 'POST';

    // 送信するデータ（編集時はIDも含める）
    const bodyData = {
      id: initialData?.id,
      title: title,
      hours: Number(hours)
    };

    try {
      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });

      if (res.ok) {
        onSuccess();
        onClose();
      } else {
      }
    } catch (err) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">
          {initialData ? '✏️ 実績の編集' : '✨ 実績の追加'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">案件名</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">削減時間 (h)</label>
            <input
              type="number"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg"
            >
              キャンセル
            </button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {initialData ? '更新する' : '追加する'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};