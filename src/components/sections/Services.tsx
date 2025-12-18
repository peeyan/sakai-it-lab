import React from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { Sheet, Cloud, Server, Check, Zap, MessageSquare, ArrowRight } from 'lucide-react'; // Cloudを追加
import { Button } from '../ui/Button';

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="ご提供できる解決策" 
          subtitle="「単発でのご依頼」も「継続的なサポート」も、柔軟に対応します。"
        />

        {/* 月額サブスクリプション */}
        <div className="mb-16">
           <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border-2 border-indigo-100 relative overflow-hidden">
             {/* 背景装飾 */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
             <div className="grid lg:grid-cols-2 gap-10 items-center relative z-10">
               <div>
                 <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 text-sm font-bold px-3 py-1 rounded-full mb-4">
                   <Zap className="w-4 h-4" />
                   人気No.1プラン
                 </div>
                 {/* スマホサイズ調整済み */}
                 <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                   IT業務の「かかりつけ医」プラン <span className="block sm:inline text-base font-normal text-gray-500 sm:ml-2 mt-1 sm:mt-0">(月額サポート)</span>
                 </h3>
                 <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                   「ベンダーに頼むほどでもないけど、自分では直せない」<br/>
                   そんな日々の小さなITトラブルを、チャット一本で解決します。<br/>
                   社内にIT担当者を一人雇う感覚でご利用ください。
                 </p>
                 <div className="flex flex-col sm:flex-row gap-4">
                   <a href="#contact">
                    <Button variant="accent" className="w-full sm:w-auto shadow-orange-200">
                      まずは月額サポートについて相談する
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                   </a>
                 </div>
               </div>

               {/* 具体的な対応例リスト */}
               <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                 <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                   <MessageSquare className="w-5 h-5 text-indigo-500 mr-2" />
                   こんな作業、ぜんぶ月額内でやります
                 </h4>
                 <ul className="space-y-3">
                   <li className="flex items-start text-gray-700">
                     <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                     {/* Kintoneを追加！ */}
                     <span><strong>Excel・Kintoneの修正・設定</strong><br/><span className="text-sm text-gray-500">「エラー修正」や「Kintoneの項目追加・権限設定」など</span></span>
                   </li>
                   <li className="flex items-start text-gray-700">
                     <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                     <span><strong>ツール間のデータ移行・整形</strong><br/><span className="text-sm text-gray-500">Excelの名簿をスプレッドシートに移したい、表記ゆれを直したい</span></span>
                   </li>
                   <li className="flex items-start text-gray-700">
                     <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                     <span><strong>ツールの選定・導入相談</strong><br/><span className="text-sm text-gray-500">「この業務に合うアプリはある？」「このシステムの設定方法教えて」</span></span>
                   </li>
                 </ul>
                 <p className="text-right text-xs text-gray-400 mt-4">
                   ※ 大規模な開発は別途お見積りとなります
                 </p>
               </div>
             </div>
           </div>
        </div>

        {/* 既存のスポット依頼（3カラム） */}
        <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-gray-700">単発（スポット）でのご依頼はこちら</h3>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Service 1: Excel */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <Sheet className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Excel・VBA自動化</h3>
            <p className="text-sm text-green-600 font-semibold mb-4">単発開発</p>
            <p className="text-gray-600 mb-6 text-sm">
              今あるExcel業務をそのまま自動化。コストを抑えて即効性のある改善を。
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-sm text-gray-700">
                <Check className="w-4 h-4 text-green-500 mr-2" /> 請求書自動作成マクロ
              </li>
              <li className="flex items-center text-sm text-gray-700">
                <Check className="w-4 h-4 text-green-500 mr-2" /> 在庫表の自動更新
              </li>
            </ul>
            <p className="text-lg font-bold text-gray-900">目安: 1万円〜10万円</p>
          </div>

          {/* Service 2: Kintone (ここを大幅リニューアル！) */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <Cloud className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Kintone導入・開発 または 業務アプリ開発</h3>
            <p className="text-sm text-blue-600 font-semibold mb-4">業務システム構築</p>
            <p className="text-gray-600 mb-6 text-sm">
              CMでおなじみのKintoneを使って、脱Excel！バラバラな情報を一つにまとめます。<br/>
              または、Googleスプレッドシートやデータベースを使った軽量業務アプリも対応可能です。
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-sm text-gray-700">
                <Check className="w-4 h-4 text-blue-500 mr-2" /> 顧客・案件管理アプリ
              </li>
              <li className="flex items-center text-sm text-gray-700">
                <Check className="w-4 h-4 text-blue-500 mr-2" /> 外出先からスマホで日報
              </li>
            </ul>
            <p className="text-lg font-bold text-gray-900">目安: 10万円〜</p>
          </div>

          {/* Service 3: System */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <Server className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">データ整理・移行</h3>
            <p className="text-sm text-purple-600 font-semibold mb-4">ITサポート</p>
            <p className="text-gray-600 mb-6 text-sm">
              バラバラのソフトを連携させたり、古いデータを新しいシステムへ移行します。
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-sm text-gray-700">
                <Check className="w-4 h-4 text-purple-500 mr-2" /> 既存基幹ソフトとの連携
              </li>
              <li className="flex items-center text-sm text-gray-700">
                <Check className="w-4 h-4 text-purple-500 mr-2" /> 複雑なデータクレンジング
              </li>
            </ul>
            <p className="text-lg font-bold text-gray-900">価格: 要相談</p>
          </div>

        </div>
      </div>
    </section>
  );
};