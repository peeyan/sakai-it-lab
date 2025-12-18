import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  // GETリクエストなどは拒否する（POSTのみ許可）
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

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
    // ユーザー名が一致するデータを探す
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    // ユーザーが見つからない、またはパスワードが違う場合
    if (rows.length === 0 || rows[0].password !== password) {
      return res.status(401).json({ error: 'IDまたはパスワードが違います' });
    }

    // ログイン成功！
    res.status(200).json({ message: 'Login successful' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await connection.end();
  }
}