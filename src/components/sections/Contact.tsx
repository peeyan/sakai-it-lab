import React from 'react';
//import { SectionTitle } from '../ui/SectionTitle';
import { Button } from '../ui/Button';
import { Mail, /*MessageCircle*/ } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-blue-600 text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            まずは『こんなことできる？』と<br/>聞いてください
          </h2>
          <p className="text-blue-100 text-lg">
            相談無料。Zoomまたは堺市内なら訪問可能です。
          </p>
        </div>

        <form className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl text-gray-900 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">お名前・会社名</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="堺 太郎"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="example@sakai-lab.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">ご相談内容</label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="「今の在庫管理をExcelからスマホに変えたい」など、ざっくりで構いません。"
            ></textarea>
          </div>

          <Button type="submit" variant="primary" className="w-full py-4 text-lg font-bold shadow-none hover:shadow-lg">
            <Mail className="w-5 h-5 mr-2" />
            無料で相談を送信する
          </Button>

          <p className="text-center text-xs text-gray-500 mt-4">
            ※ 営業メールはお断りしております。
          </p>
        </form>
      </div>
    </section>
  );
};