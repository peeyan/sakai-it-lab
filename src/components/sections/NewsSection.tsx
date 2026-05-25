import React from 'react';

type NewsItem = {
  date: string;
  title: string;
  tag: string;
  tagColor: string;
  href?: string;
};

const NEWS: NewsItem[] = [
  {
    date: '2026-05-25',
    title: 'X（旧Twitter）にて情報発信を開始しました。ぜひフォローください！',
    tag: 'SNS',
    tagColor: 'bg-sky-100 text-sky-700',
    href: 'https://x.com/DekobokoHQ',
  },
  {
    date: '2026-05-25',
    title: 'デコボコカンパニー コーポレートサイトをリニューアルしました',
    tag: 'お知らせ',
    tagColor: 'bg-indigo-100 text-indigo-700',
  },
  {
    date: '2026-05-23',
    title: '【新プロダクト】AI Prompt Vault を Chrome Web Store に申請しました（審査中）',
    tag: 'プロダクト',
    tagColor: 'bg-violet-100 text-violet-700',
  },
];

export const NewsSection: React.FC = () => {
  return (
    <section className="py-12 bg-white border-b">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">📢 最新のお知らせ</h2>
        <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
          <ul className="space-y-4">
            {NEWS.map((item, i) => (
              <li key={i} className="flex flex-col md:flex-row md:items-center border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                <span className="text-gray-500 text-sm font-mono md:w-32">
                  {item.date}
                </span>
                <span className="font-medium text-gray-800 flex-1">
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer"
                       className="hover:text-indigo-600 underline underline-offset-2">
                      {item.title}
                    </a>
                  ) : item.title}
                </span>
                <span className={`text-xs px-2 py-1 rounded mt-1 md:mt-0 w-fit font-semibold ${item.tagColor}`}>
                  {item.tag}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};