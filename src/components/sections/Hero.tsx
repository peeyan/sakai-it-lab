import React from 'react';
import { ArrowRight, HandHeart } from 'lucide-react';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
  return (
    // pt(上余白)を少し調整しました
    <section className="relative pt-28 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* 背景グラデーション：少し濃くして白文字を見やすく */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-orange-100 -z-20"></div>
      
      {/* 装飾用の背景ブラー（温かみを出すオレンジの光） */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -z-10 hidden lg:block"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* PCでは2列、スマホでは1列のグリッドレイアウト */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* 左側：テキストコンテンツ（スマホでは上） */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-white border border-indigo-100 shadow-sm px-4 py-1.5 rounded-full mb-8">
              <HandHeart className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-bold text-indigo-900">堺の企業を応援する、ITの便利屋さん</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
              「また残業かぁ…」そのため息、
              <span className="text-indigo-600 relative whitespace-nowrap block md:inline">
                 私に預けてみませんか？
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-orange-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed font-medium">
              難しい専門用語は使いません。<br />
              あなたの周りの「ちょっとPCに詳しい親戚」や「隣の席の同僚」など。<br />
              そんな距離感で、面倒な事務作業を片付けるお手伝いをします。
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a href="#contact" className="w-full sm:w-auto">
                <Button variant="primary" className="w-full gap-2">
                  まずは雑談感覚で連絡する
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <a href="#services" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full bg-white/80 backdrop-blur-sm">
                  どんなことができるの？
                </Button>
              </a>
            </div>
          </div>

          {/* 右側：画像（スマホでは下） */}
          <div className="relative order-1 lg:order-2 mx-auto max-w-md lg:max-w-none">
            {/* 画像枠：少し傾けて親しみやすさを演出 */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
              {/* ここに public/hero-image.jpg が表示されます */}
              <img
                src="/hero-image.jpg"
                alt="親身に相談に乗るITパートナーの様子"
                className="w-full h-auto object-cover"
              />
              {/* 画像の上にメッセージを乗せる */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-900/80 to-transparent p-6 text-white text-left">
                <p className="font-bold text-lg">「その作業、もっと楽になりますよ」</p>
                <p className="text-sm opacity-90">わたしも隣で一緒に考えます！！</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};