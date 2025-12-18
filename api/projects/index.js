import { getDbConnection } from '../_db.js';

export default async function handler(req, res) {
  const connection = await getDbConnection();
  try {
    // 納期が近い順、または作成日順で取得
    const [rows] = await connection.execute('SELECT * FROM projects ORDER BY id DESC');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await connection.end();
  }
}