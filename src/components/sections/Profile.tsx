import React, { useState } from 'react';
import { MapPin, Smile } from 'lucide-react';

export const Profile: React.FC = () => {
  // 画像の読み込みエラーを管理するスイッチ
  const [imageError, setImageError] = useState(false);

  return (
    <section id="profile" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 shadow-sm">
          <div className="flex-shrink-0 relative">
            {/* ▼▼▼ ここが自動切り替えのロジックです ▼▼▼ */}
            {!imageError ? (
              // 1. まず画像を表示しようとします
              <img 
                src="/profile.jpg" 
                alt="プロフィール写真" 
                // もし画像が見つからない場合、この関数が動いてスイッチが切り替わります
                onError={() => setImageError(true)}
                className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-white"
              />
            ) : (
              // 2. エラーになったら（スイッチが入ったら）こっちのアイコンを表示します
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-md border-4 border-white">
                <Smile className="w-16 h-16 text-indigo-300" />
              </div>
            )}
            {/* ▲▲▲ ここまで ▲▲▲ */}

            {/* 吹き出し */}
            <div className="absolute -bottom-2 -right-2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full border-2 border-white flex items-center gap-1">
              <Smile className="w-3 h-3" />
              お気軽に！
            </div>
          </div>

          <div className="text-center md:text-left">
            <div className="inline-block bg-indigo-100 text-indigo-800 text-xs font-bold px-2 py-1 rounded-md mb-2">
              PROFILE
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              あなたの「隣の席の同僚」に相談する感覚で。
            </h2>

            <p className="text-xl font-bold text-gray-900 mb-2">
              代表：宮岡 幸平 <span className="text-base font-normal text-gray-500 ml-2">Miyaoka Kohei</span>
            </p>

            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 font-medium mb-4 text-sm">
              <MapPin className="w-4 h-4 text-indigo-500" />
              <span>大阪府堺市北区在住 / エンジニア</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              はじめまして。現役エンジニアとして開発を行う傍ら、地元・堺の個人事業主様の「困った」を解決しています。<br /><br />
              私が目指しているのは、外部の業者ではなく<span className="font-bold text-indigo-600">「いつでも声をかけられる身近な助っ人」</span>です。
              「こんなこと聞いてもいいのかな？」と遠慮する必要はありません。
              仕様書も準備もいりません。現場の愚痴をこぼす感覚で、まずはお話ししましょう。
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};