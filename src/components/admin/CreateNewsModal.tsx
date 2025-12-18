import React, { useState } from 'react';
import { Button } from '../ui/Button';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export const CreateNewsModal: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // 今日の日付
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/news/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          published_date: date
        }),
      });

      if (res.ok) {
        alert('お知らせを登録しました！');
        setTitle('');
        setContent('');
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
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg">
        <h3 className="text-xl font-bold mb-4">📢 お知らせの投稿</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* タイトル */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">タイトル</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* 公開日 */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">公開日</label>
            <input
              type="date"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* 本文（複数行入力） */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">本文</label>
            <textarea
              rows={4}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
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
              投稿する
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};