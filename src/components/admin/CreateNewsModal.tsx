import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';

// データ型
type NewsData = {
  id?: number;
  title: string;
  content: string;
  published_date: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: NewsData | null;
};

export const CreateNewsModal: React.FC<Props> = ({ isOpen, onClose, onSuccess, initialData }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // モーダルが開くたびに中身をセット
  useEffect(() => {
    if (initialData) {
      // 編集モード：日付の形式(yyyy-mm-dd)を整えてセット
      const formattedDate = new Date(initialData.published_date).toISOString().split('T')[0];
      setTitle(initialData.title);
      setContent(initialData.content || '');
      setDate(formattedDate);
    } else {
      // 新規モード：今日の日付をセット
      setTitle('');
      setContent('');
      setDate(new Date().toISOString().split('T')[0]);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 編集か新規かで切り替え
    const isEditMode = !!initialData;
    const url = isEditMode ? '/api/news/update' : '/api/news/add';
    const method = isEditMode ? 'PUT' : 'POST';

    const bodyData = {
      id: initialData?.id,
      title,
      content,
      published_date: date
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
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg">
        <h3 className="text-xl font-bold mb-4">
          {initialData ? '✏️ お知らせの編集' : '📢 お知らせの投稿'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              {initialData ? '更新する' : '投稿する'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};