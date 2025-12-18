import { getDbConnection } from '../_db';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { title, content, published_date } = req.body;

  const connection = await getDbConnection();
  try {
    await connection.execute(
      'INSERT INTO news (title, content, published_date) VALUES (?, ?, ?)',
      [title, content || '', published_date]
    );
    res.status(200).json({ message: '登録成功' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await connection.end();
  }
}