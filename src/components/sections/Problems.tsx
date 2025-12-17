import React from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { Copy, FileEdit, Database } from 'lucide-react';

export const Problems: React.FC = () => {
  const problems = [
    {
      icon: <Copy className="w-10 h-10 text-red-500" />,
      title: "Excelのコピペ地獄",
      description: "毎日同じデータを貼り付け、ミスが怖い。単純作業に時間を奪われていませんか？"
    },
    {
      icon: <FileEdit className="w-10 h-10 text-orange-500" />,
      title: "紙情報のPC入力",
      description: "現場のメモを事務所に戻ってから入力し直し。二度手間は今日で終わりにしましょう。"
    },
    {
      icon: <Database className="w-10 h-10 text-purple-500" />,
      title: "データ散在",
      description: "顧客リストや売上がバラバラで管理できていない。必要な情報がすぐに取り出せますか？"
    }
  ];

  return (
    <section id="problems" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="こんな『もったいない時間』過ごしていませんか？"
        />

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {problems.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-white p-4 rounded-xl inline-block shadow-sm mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};