import { useState } from 'react';
import { Button } from '../ui/Button';
import { Mail, MessageCircle, CheckCircle } from 'lucide-react';
import { Toast } from '../ui/Toast';

export const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' as 'success' | 'error' });
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // フォームを空にする
        setFormData({ name: '', company: '', email: '', message: '' });
      } else {
        setToast({ show: true, message: '送信に失敗しました。', type: 'error' });
      }
    } catch (err) {
      setToast({ show: true, message: '通信エラーが発生しました。', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 送信成功時の表示画面
  if (isSubmitting) {
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

          <p className="text-indigo-100 text-base sm:text-lg">
            準備はいりません。<br/>
            「これ、なんとかなる？」だけでOKです。
          </p>

          <p className="text-indigo-100 text-lg">
            正式な依頼の前に、まずは相性確認のおしゃべりから始めませんか？<br />
            Zoom、または堺市内なら車でお伺いも可能です🚲
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-10 shadow-2xl text-gray-900 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">お名前 <span className="text-red-500">*</span></label>
              <input
                type="text" name="name" required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="山田 太郎"
                value={formData.name} onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">会社名</label>
              <input
                type="text" name="company"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="株式会社〇〇"
                value={formData.company} onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">メールアドレス <span className="text-red-500">*</span></label>
            <input
              type="email" name="email" required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="example@email.com"
              value={formData.email} onChange={handleChange}
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-700 mb-2">お問い合わせ内容 <span className="text-red-500">*</span></label>
            <textarea
              name="message" required rows={5}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="具体的なご相談内容をご記入ください"
              value={formData.message} onChange={handleChange}
            />
          </div>

          <Button
            type="submit"
            variant="accent"
            // py-3 sm:py-4 : スマホでは縦幅を少し狭く、PCでは広く
            // text-base sm:text-lg : スマホでは文字サイズを標準に、PCでは大きく
            className="w-full py-3 sm:py-4 text-base sm:text-lg font-bold shadow-lg hover:shadow-xl transform transition hover:-translate-y-1"
            disabled={isSubmitting}
          >
            <Mail className="w-5 h-5 mr-2" />
            {isSubmitting ? '送信中...' : '送信する'}
          </Button>

          <p className="text-center text-xs text-gray-400 mt-4">
            ※ 売り込みはしませんのでご安心ください。
          </p>
        </form>

        <Toast
          isVisible={toast.show}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />

      </div>
    </section>
  );
};