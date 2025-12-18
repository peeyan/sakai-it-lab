import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  // DELETEメソッド以外は拒否
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 「どのIDを消すか」を受け取る
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'IDがありません' });
  }

  const connection = await mysql.createConnection({
    host: process.env.TIDB_HOST,
    user: process.env.TIDB_USER,
    password: process.env.TIDB_PASSWORD,
    database: process.env.TIDB_DATABASE || 'test',
    port: 4000,
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true
    }
  });

  try {
    // 指定されたIDのデータを削除する
    await connection.execute('DELETE FROM achievements WHERE id = ?', [id]);

    res.status(200).json({ message: '削除成功' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await connection.end();
  }
}