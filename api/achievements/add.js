import { getDbConnection } from '../_db.js';

export default async function handler(req, res) {
  // POST（データの送信）以外は拒否
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // フロントエンドから送られてきたデータを受け取る
  const { title, hours } = req.body;
  if (!title || !hours) {return;}

  const connection = await getDbConnection();

  try {
    // データベースに保存する（INSERT文）
    // 「?」を使うことで、SQLインジェクション（攻撃）を防ぎながら安全に保存します
    await connection.execute(
      'INSERT INTO achievements (title, hours) VALUES (?, ?)',
      [title, hours]
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await connection.end();
  }
}