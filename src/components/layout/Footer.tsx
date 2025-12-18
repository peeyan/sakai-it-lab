import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-medium text-lg mb-2">堺・IT業務改善ラボ</p>
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Sakai IT Business Improvement Lab. (Rep: Kohei Miyaoka)
        </p>
        /* 管理者ページへの入り口 のちに削除する */
        <div className="mt-8 pt-4 border-t border-gray-800">
          <a href="/admin" className="text-gray-800 hover:text-gray-600 text-xs transition-colors">
            Admin Login
          </a>
        </div>
      </div>
    </footer>
  );
};