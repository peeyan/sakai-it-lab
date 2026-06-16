import React, { useEffect } from 'react';

type Props = {
  message: string;
  type?: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
};

export const Toast: React.FC<Props> = ({ message, type = 'success', isVisible, onClose }) => {
  // 表示されたら、3秒後に自動で閉じるタイマー
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // 3000ms = 3秒
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  // 色のデザイン分け
  const bgClass = type === 'success' ? 'bg-green-600' : 'bg-red-600';

  return (
    <div className={`fixed bottom-4 right-4 ${bgClass} text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3 transition-all duration-300 transform translate-y-0`}>
      <span className="text-xl">
        {type === 'success' ? '✅' : '⚠️'}
      </span>
      <p className="font-bold">{message}</p>
      <button onClick={onClose} className="ml-4 opacity-70 hover:opacity-100">
        ✕
      </button>
    </div>
  );
};