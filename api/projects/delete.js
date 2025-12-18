import { getDbConnection } from '../_db.js';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') return res.status(405).json({ error: 'Method not allowed' });
  const { id } = req.body;
  let connection;
  try {
    connection = await getDbConnection();
    await connection.execute('DELETE FROM projects WHERE id = ?', [id]);
    res.status(200).json({ message: '案件を削除しました' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) await connection.end();
  }
}