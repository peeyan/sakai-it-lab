import React from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { TrendingDown, Clock, AlertCircle, Users } from 'lucide-react';

const cases = [
  {
    industry: '製造業',
    size: '従業員 15名',
    problem: '毎月末の請求書作成に丸1日かかっていた',
    solution: 'Excel マクロで請求書を自動生成',
    result: '月 20時間削減',
    icon: <Clock className="w-6 h-6 text-green-600" />,
    color: 'bg-green-50 border-green-100',
    badge: 'text-green-700 bg-green-100',
  },
  {
    industry: '小売業',
    size: '従業員 8名',
    problem: '在庫表の転記ミスによるクレームが月3〜4件発生',
    solution: 'Kintone で在庫・受発注を一元管理',
    result: 'ミス件数ゼロ',
    icon: <AlertCircle className="w-6 h-6 text-blue-600" />,
    color: 'bg-blue-50 border-blue-100',
    badge: 'text-blue-700 bg-blue-100',
  },
  {
    industry: 'サービス業',
    size: '従業員 30名',
    problem: '顧客情報がExcel・紙・個人メモにバラバラで共有できない',
    solution: '業務アプリで顧客情報を全社統合',
    result: '情報共有コスト 50%削減',
    icon: <Users className="w-6 h-6 text-violet-600" />,
    color: 'bg-violet-50 border-violet-100',
    badge: 'text-violet-700 bg-violet-100',
  },
];

export const Achievements: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="導入事例"
          subtitle="実際にお手伝いした「before → after」をご紹介します。（※ご要望によりすべて匿名掲載）"
        />

        {/* KPI バー */}
        <div className="grid grid-cols-3 gap-4 mb-14 mt-10">
          {[
            { num: '20+', label: '支援実績' },
            { num: '月平均 18h', label: '削減工数' },
            { num: '100%', label: '継続率' },
          ].map((kpi) => (
            <div key={kpi.label} className="text-center bg-indigo-50 rounded-2xl py-6 px-4 border border-indigo-100">
              <p className="text-2xl sm:text-3xl font-extrabold text-indigo-600 mb-1">{kpi.num}</p>
              <p className="text-sm text-gray-500 font-medium">{kpi.label}</p>
            </div>
          ))}
        </div>

        {/* 事例カード */}
        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((c, i) => (
            <div key={i} className={`rounded-2xl p-8 border ${c.color} flex flex-col gap-4`}>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${c.badge}`}>
                  {c.industry} / {c.size}
                </span>
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  {c.icon}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Before</p>
                <p className="text-gray-700 text-sm leading-relaxed">{c.problem}</p>
              </div>

              <div className="border-t border-dashed border-gray-200 pt-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">After</p>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">{c.solution}</p>
                <div className="inline-flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border">
                  <TrendingDown className="w-4 h-4 text-green-500" />
                  <span className="font-extrabold text-gray-900 text-sm">{c.result}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          ※ 掲載内容はご本人の確認のもと、一部抽象化して掲載しています。
        </p>
      </div>
    </section>
  );
};
