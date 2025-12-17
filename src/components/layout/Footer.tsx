import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-medium text-lg mb-2">堺・IT業務改善ラボ</p>
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Sakai IT Business Improvement Lab. All rights reserved.
        </p>
      </div>
    </footer>
  );
};