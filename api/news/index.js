import { getDbConnection } from '../_db.js';

export default async function handler(req, res) {
  const connection = await getDbConnection();
  try {
    const [rows] = await connection.execute('SELECT * FROM news ORDER BY published_date DESC');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await connection.end();
  }
}