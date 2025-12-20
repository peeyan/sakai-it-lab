import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  console.log('★APIにアクセスがありました！');
  console.log('メソッド:', req.method);
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, company, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: '必須項目が足りません' });
  }

  try {
    // 1. トランスポーターを設定
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // 2. 送るメールの内容（あなた宛ての通知）
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // 自分自身に送る
      replyTo: email, // 返信先はお客さんのメアド
      subject: `【Webサイトより】お問い合わせ：${name}様`,
      text: `
Webサイトから新しいお問い合わせがありました！

--------------------------------------------------
■お名前: ${name}
■会社名: ${company || 'なし'}
■メール: ${email}
--------------------------------------------------

■メッセージ:
${message}
      `,
    };

    // 3. 送信実行！
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: '送信成功' });

  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: 'メール送信に失敗しました' });
  }
}