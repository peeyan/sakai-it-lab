import React from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { Sheet, Smartphone, Server, Check } from 'lucide-react';

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="ご提供できる解決策"
          subtitle="お客様の課題に合わせて、最適な技術を選定します。"
        />

        <div className="grid lg:grid-cols-3 gap-8 mt-12 items-start">

          {/* Service 1: Excel */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <Sheet className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Excel・スプレッドシート自動化</h3>
            <p className="text-sm text-green-600 font-semibold mb-4">VBA / Google Apps Script</p>
            <p className="text-gray-600 mb-6 text-sm">
              今あるExcel業務をそのまま自動化。コストを抑えて即効性のある改善を。
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-sm text-gray-700">
                <Check className="w-4 h-4 text-green-500 mr-2" /> 請求書自動作成
              </li>
              <li className="flex items-center text-sm text-gray-700">
                <Check className="w-4 h-4 text-green-500 mr-2" /> 在庫表の自動更新
              </li>
            </ul>
            <p className="text-lg font-bold text-gray-900">目安: 3万円〜</p>
          </div>

          {/* Service 2: App (Highlight) */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-blue-600 relative transform lg:-translate-y-4">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
              おすすめ
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <Smartphone className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">カスタム業務アプリ開発</h3>
            <p className="text-sm text-blue-600 font-semibold mb-4">React / Node.js</p>
            <p className="text-gray-600 mb-6 text-sm">
              スマホやタブレットで使える専用アプリ。現場と事務所をリアルタイムで繋ぎます。
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-sm text-gray-700">
                <Check className="w-4 h-4 text-blue-500 mr-2" /> スマホで簡単日報
              </li>
              <li className="flex items-center text-sm text-gray-700">
                <Check className="w-4 h-4 text-blue-500 mr-2" /> LINE連携予約システム
              </li>
              <li className="flex items-center text-sm text-gray-700">
                <Check className="w-4 h-4 text-blue-500 mr-2" /> 外出先から在庫確認
              </li>
            </ul>
            <p className="text-xl font-bold text-gray-900">目安: 15万円〜</p>
          </div>

          {/* Service 3: System */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <Server className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">システム連携・データ整理</h3>
            <p className="text-sm text-purple-600 font-semibold mb-4">Node.js / Database</p>
            <p className="text-gray-600 mb-6 text-sm">
              バラバラのソフトを連携させたり、古いデータを新しいシステムへ移行します。
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-sm text-gray-700">
                <Check className="w-4 h-4 text-purple-500 mr-2" /> 既存基幹ソフトとの連携
              </li>
              <li className="flex items-center text-sm text-gray-700">
                <Check className="w-4 h-4 text-purple-500 mr-2" /> 複雑なデータ移行・整理
              </li>
            </ul>
            <p className="text-lg font-bold text-gray-900">価格: 要相談</p>
          </div>

        </div>
      </div>
    </section>
  );
};