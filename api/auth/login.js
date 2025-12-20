import { getDbConnection } from '../_db.js';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { username, password } = req.body;

  try {
    const connection = await getDbConnection();

    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    await connection.end();

    // ユーザーがいない場合
    if (rows.length === 0) {
      return res.status(401).json({ error: 'IDまたはパスワードが違います' });
    }
    const user = rows[0];
    // パスワードの照合
    // bcrypt.compare(入力された生パスワード, DBにある暗号化パスワード)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'IDまたはパスワードが違います' });
    }

    res.status(200).json({ message: 'Login successful' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}