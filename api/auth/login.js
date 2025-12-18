import mysql from 'mysql2/promise'; // ← 直接mysqlを使う

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { username, password } = req.body;

  // ▼▼▼ 直接ここに書いちゃう（テスト用） ▼▼▼
  const connection = await mysql.createConnection({
    host: process.env.TIDB_HOST,
    user: process.env.TIDB_USER,
    password: process.env.TIDB_PASSWORD,
    database: process.env.TIDB_DATABASE || 'test',
    port: 4000,
    ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true }
  });
  // ▲▲▲▲▲▲

  try {
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if (rows.length === 0 || rows[0].password !== password) {
      return res.status(401).json({ error: 'IDまたはパスワードが違います' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  } finally {
    await connection.end();
  }
}