import { getDbConnection } from '../_db.js';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') return res.status(405).json({ error: 'Method not allowed' });
  const { id } = req.body;

  const connection = await getDbConnection();
  try {
    await connection.execute('DELETE FROM news WHERE id = ?', [id]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await connection.end();
  }
}