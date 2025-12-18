import { getDbConnection } from './_db.js';

export default async function handler(req, res) {
  const connection = await getDbConnection();
  try {
    // ▼ GET: 一覧取得
    if (req.method === 'GET') {
      const [rows] = await connection.execute('SELECT * FROM achievements ORDER BY id DESC');
      return res.status(200).json(rows);
    }

    // ▼ POST: 新規追加
    if (req.method === 'POST') {
      const { title, hours } = req.body;
      if (!title || !hours) {
        return res.status(400).json({ error: '入力内容が足りません' });
      }
      await connection.execute(
        'INSERT INTO achievements (title, hours) VALUES (?, ?)',
        [title, hours]
      );
      res.status(200).json({ message: '登録完了！' });
    }

    // ▼ PUT: 更新
    if (req.method === 'PUT') {
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ error: 'IDが必要です' });
      }
      await connection.execute(
        'UPDATE achievements SET title = ?, hours = ? WHERE id = ?',
        [title, hours, id]
      );
      res.status(200).json({ message: '更新完了！' });
    }

    // ▼ DELETE: 削除
    if (req.method === 'DELETE') {
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ error: 'IDが必要です' });
      }
      await connection.execute(
        'DELETE FROM achievements WHERE id = ?',
        [id]
      );
      res.status(200).json({ message: '削除完了！' });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await connection.end();
  }
}