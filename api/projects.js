import { getDbConnection } from './_db.js';

export default async function handler(req, res) {
  const connection = await getDbConnection();

  try {
    // ▼ GET: 一覧取得
    if (req.method === 'GET') {
      const [rows] = await connection.execute('SELECT * FROM projects ORDER BY id DESC');
      return res.status(200).json(rows);
    }

    // ▼ POST: 新規追加
    if (req.method === 'POST') {
      const { client_name, project_name, status, budget, deadline, memo } = req.body;
      if (!client_name || !project_name) return res.status(400).json({ error: '必須項目がありません' });

      await connection.execute(
        'INSERT INTO projects (client_name, project_name, status, budget, deadline, memo) VALUES (?, ?, ?, ?, ?, ?)',
        [client_name, project_name, status || '未対応', budget || 0, deadline, memo || '']
      );
      return res.status(200).json({ message: '登録しました' });
    }

    // ▼ PUT: 更新
    if (req.method === 'PUT') {
      const { id, client_name, project_name, status, budget, deadline, memo } = req.body;
      await connection.execute(
        'UPDATE projects SET client_name=?, project_name=?, status=?, budget=?, deadline=?, memo=? WHERE id=?',
        [client_name, project_name, status, budget, deadline, memo, id]
      );
      return res.status(200).json({ message: '更新しました' });
    }

    // ▼ DELETE: 削除
    if (req.method === 'DELETE') {
      const { id } = req.body;
      await connection.execute('DELETE FROM projects WHERE id = ?', [id]);
      return res.status(200).json({ message: '削除しました' });
    }

    // それ以外
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  } finally {
    await connection.end();
  }
}