import React from 'react';
import { useForm, ValidationError } from '@formspree/react'; // 追加
import { Button } from '../ui/Button';
import { Mail, MessageCircle, CheckCircle } from 'lucide-react'; // CheckCircle追加

export const Contact: React.FC = () => {
  const [state, handleSubmit] = useForm("mgowwzle");

  // 送信成功時の表示画面
  if (state.succeeded) {
    return (
      <section id="contact" className="py-20 bg-indigo-600 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">お問い合わせありがとうございます！</h2>
            <p className="text-xl text-indigo-100">
              メッセージは無事に届きました。<br />
              内容を確認次第、ご連絡させていただきます。
            </p>
            <div className="mt-8">
              <Button variant="secondary" onClick={() => window.location.reload()}>
                元の画面に戻る
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-indigo-600 text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-500 rounded-full mb-4 ring-4 ring-indigo-500/30">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-md leading-snug">
            準備はいりません。<br/>
            「これ、なんとかなる？」だけでOKです。
          </h2>

          <p className="text-indigo-100 text-lg">
            正式な依頼の前に、まずは相性確認のおしゃべりから始めませんか？<br />
            Zoom、または堺市内なら車でお伺いも可能です🚲
          </p>
        </div>

        {/* onSubmitにhandleSubmitを指定してFormspreeと連携 */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-10 shadow-2xl text-gray-900 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1">お名前</label>
              <input
                type="text"
                id="name"
                name="name" // name属性が必須になります
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-colors"
                placeholder="ニックネームでもOKです"
              />
              <ValidationError prefix="Name" field="name" errors={state.errors} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">連絡先 (メール)</label>
              <input
                type="email"
                id="email"
                name="email" // name属性が必須になります
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-colors"
                placeholder="普段使っているアドレスで"
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-1">
              今の「めんどくさい」を教えてください
            </label>
            <textarea
              id="message"
              name="message" // name属性が必須になります
              rows={4}
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-colors"
              placeholder="（例）毎日の在庫チェックを手書きするのが大変で...。スマホでポチッとできませんか？"
            ></textarea>
            <ValidationError prefix="Message" field="message" errors={state.errors} />
          </div>

          <Button
            type="submit"
            variant="accent"
            className="w-full py-4 text-lg font-bold shadow-lg hover:shadow-xl transform transition hover:-translate-y-1"
            disabled={state.submitting} // 送信中はボタンを押せなくする
          >
            <Mail className="w-5 h-5 mr-2" />
            {state.submitting ? '送信中...' : 'とりあえず聞いてみる（無料）'}
          </Button>

          <p className="text-center text-xs text-gray-400 mt-4">
            ※ 売り込みはしませんのでご安心ください。
          </p>
        </form>
      </div>
    </section>
  );
};