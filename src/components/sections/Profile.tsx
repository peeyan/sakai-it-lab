import React from 'react';
import { User, MapPin } from 'lucide-react';

export const Profile: React.FC = () => {
  return (
    <section id="profile" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">

          {/* Avatar / Icon Placeholder */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-md border-4 border-white">
              <User className="w-16 h-16 text-blue-300" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">エンジニア / 業務改善パートナー</h2>
            <div className="flex items-center justify-center md:justify-start gap-2 text-blue-700 font-medium mb-4">
              <MapPin className="w-4 h-4" />
              <span>大阪府堺市堺区在住</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              中規模企業でReact/Node.jsを用いた開発を行う現役エンジニア。<br />
              綺麗なコードを書くだけでなく、「現場目線の泥臭い業務改善」が得意です。
              難しい専門用語は使いません。隣の席の同僚に相談する感覚でお話しください。
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};