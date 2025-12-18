import React, { useState } from 'react';
import { Button } from '../ui/Button';

type Props = {
  isOpen: boolean;
  onClose: () => void;    // 閉じる時の処理
  onSuccess: () => void;  // 成功した時の処理
};

export const CreateAchievementModal: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [hours, setHours] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 閉じていたら何も表示しない
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/achievements/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title,
          hours: Number(hours)
        }),
      });

      if (res.ok) {
        alert('登録しました！');
        setTitle('');
        setHours('');
        onSuccess();
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">✨ 実績の追加</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">案件名</label>
            <input
              type="text"
              required
              placeholder="例：D社 経費精算自動化"
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
              placeholder="例：10"
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
              {isSubmitting ? '送信中...' : '追加する'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};