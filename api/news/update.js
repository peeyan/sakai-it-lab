import { getDbConnection } from '../_db.js';

export default async function handler(req, res) {
  // PUTメソッド（更新）以外は拒否
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id, title, content, published_date } = req.body;

  if (!id || !title || !published_date) {
    return res.status(400).json({ error: '必須項目が足りません' });
  }

  try {
    const connection = await getDbConnection();
    // お知らせを更新するSQL
    await connection.execute(
      'UPDATE news SET title = ?, content = ?, published_date = ? WHERE id = ?',
      [title, content || '', published_date, id]
    );
    await connection.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}