import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Toast } from '../ui/Toast'; // さっき作ったToastを再利用！

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' as 'success' | 'error' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setToast({ show: true, message: 'お問い合わせを送信しました！', type: 'success' });
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

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">お問い合わせ</h2>
          <p className="text-gray-600">
            業務効率化のご相談、お見積もりなど、お気軽にご連絡ください。
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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

          <div className="text-center">
            <Button
              type="submit"
              variant="primary"
              className="w-full md:w-auto px-12 py-4 text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? '送信中...' : '送信する'}
            </Button>
          </div>
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