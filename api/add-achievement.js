import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  // POST（データの送信）以外は拒否
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // フロントエンドから送られてきたデータを受け取る
  const { title, hours } = req.body;
  if (!title || !hours) {
    return res.status(400).json({ error: '入力内容が足りません' });
  }

  const connection = await mysql.createConnection({
    host: process.env.TIDB_HOST,
    user: process.env.TIDB_USER,
    password: process.env.TIDB_PASSWORD,
    database: process.env.TIDB_DATABASE || 'test',
    port: 4000,
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true
    }
  });

  try {
    // データベースに保存する（INSERT文）
    // 「?」を使うことで、SQLインジェクション（攻撃）を防ぎながら安全に保存します
    await connection.execute(
      'INSERT INTO achievements (title, hours) VALUES (?, ?)',
      [title, hours]
    );

    res.status(200).json({ message: '登録完了！' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await connection.end();
  }
}