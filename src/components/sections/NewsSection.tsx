import React, { useEffect, useState } from 'react';

// 型定義
type NewsItem = {
  id: number;
  title: string;
  published_date: string;
};

export const NewsSection: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  // データ取得ロジック
  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => {
        // 最新3件だけ取得
        setNews(data.slice(0, 3));
      })
      .catch((err) => console.error(err));
  }, []);

  // 何もなければ表示しない（あるいは「ありません」と出す）
  return (
    <section className="py-12 bg-white border-b">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">📢 最新のお知らせ</h2>

        {news.length === 0 ? (
          <p className="text-center text-gray-500">現在お知らせはありません。</p>
        ) : (
          <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
            <ul className="space-y-4">
              {news.map((item) => (
                <li key={item.id} className="flex flex-col md:flex-row md:items-center border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                  <span className="text-gray-500 text-sm font-mono md:w-32">
                    {new Date(item.published_date).toLocaleDateString()}
                  </span>
                  <span className="font-medium text-gray-800 flex-1 hover:text-indigo-600 cursor-pointer">
                    {item.title}
                  </span>
                  <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded mt-1 md:mt-0 w-fit">
                    NEWS
                  </span>
                </li>
              ))}
            </ul>
            <div className="text-right mt-4">
               <a href="#" className="text-sm text-indigo-600 hover:underline">お知らせ一覧へ →</a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};