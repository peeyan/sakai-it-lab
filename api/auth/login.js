import { getDbConnection } from '../../lib/db';

export default async function handler(req, res) {
  // GETリクエストなどは拒否する
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  const connection = await getDbConnection();

  try {
    // ユーザー名が一致するデータを探す
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    // ユーザーが見つからない、またはパスワードが違う場合
    console.log(rows.length);
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