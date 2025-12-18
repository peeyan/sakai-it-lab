import { getDbConnection } from '../_db.js';

export default async function handler(req, res) {
  const connection = await getDbConnection();

  try {
    // データベースから全ての「実績データ」を取得する
    const [rows] = await connection.execute('SELECT * FROM achievements ORDER BY id DESC');

    // 取得したデータをそのまま画面（React）に返す
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await connection.end();
  }
}