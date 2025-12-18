import { getDbConnection } from './_db.js';

export default async function handler(req, res) {
  const connection = await getDbConnection();
  try {
    // ▼ GET: 一覧取得
    if (req.method === 'GET') {
      const [rows] = await connection.execute('SELECT * FROM news ORDER BY id DESC');
      return res.status(200).json(rows);
    }
    // ▼ POST: 新規追加
    if (req.method === 'POST'){
      const { title, content, published_date } = req.body;
      if (!title || !content) {
        return res.status(400).json({ error: 'タイトルと内容は必須です' });
      }
      await connection.execute(
        'INSERT INTO news (title, content, published_date) VALUES (?, ?, ?)',
        [title, content || '', published_date]
      );
      res.status(200).json({ message: '登録成功' });
    }

    // ▼ PUT: 更新
    if (req.method === 'PUT') {
      const { id, title, content, published_date } = req.body;
      if (!id || !title || !content) {
        return res.status(400).json({ error: 'ID、タイトル、内容は必須です' });
      }
      await connection.execute(
        'UPDATE news SET title = ?, content = ?, published_date = ? WHERE id = ?',
        [title, content, published_date, id]
      );
      res.status(200).json({ message: '更新成功' });
    }

    // ▼ DELETE: 削除
    if (req.method === 'DELETE') {
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ error: 'IDは必須です' });
      }
      await connection.execute(
        'DELETE FROM news WHERE id = ?',
        [id]
      );
      res.status(200).json({ message: '削除成功' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await connection.end();
  }
}