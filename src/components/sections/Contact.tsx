import React from 'react';
import { Button } from '../ui/Button';
import { Mail, MessageCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-indigo-600 text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-500 rounded-full mb-4 ring-4 ring-indigo-500/30">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>

          {/* ▼▼▼ ここを修正しました ▼▼▼ */}
          {/* drop-shadow-md: 文字に影をつける */}
          {/* leading-snug: 行間を少し調整して読みやすくする */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-md leading-snug">
            準備はいりません。<br/>
            「これ、なんとかなる？」だけでOKです。
          </h2>
          {/* ▲▲▲ ここまで ▲▲▲ */}

          <p className="text-indigo-100 text-lg">
            正式な依頼の前に、まずは相性確認のおしゃべりから始めませんか？<br />
            Zoom、または堺市内なら車でお伺いも可能です🚲
          </p>
        </div>

        <form className="bg-white rounded-2xl p-6 md:p-10 shadow-2xl text-gray-900 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1">お名前</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-colors"
                placeholder="ニックネームでもOKです"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">連絡先 (メール)</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-colors"
                placeholder="普段使っているアドレスで"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-1">
              今の「めんどくさい」を教えてください
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-colors"
              placeholder="（例）毎日の在庫チェックを手書きするのが大変で...。スマホでポチッとできませんか？"
            ></textarea>
          </div>

          <Button type="submit" variant="accent" className="w-full py-4 text-lg font-bold shadow-lg hover:shadow-xl transform transition hover:-translate-y-1">
            <Mail className="w-5 h-5 mr-2" />
            とりあえず聞いてみる（無料）
          </Button>

          <p className="text-center text-xs text-gray-400 mt-4">
            ※ 売り込みはしませんのでご安心ください。
          </p>
        </form>
      </div>
    </section>
  );
};