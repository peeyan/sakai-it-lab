import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  // ▼▼▼ ここをTiDBの接続情報に書き換えてください ▼▼▼
  const connection = await mysql.createConnection({
    // process.env.〇〇 で .env.local の中身を読み込みます
    host: process.env.TIDB_HOST,
    user: process.env.TIDB_USER,
    password: process.env.TIDB_PASSWORD,
    database: process.env.TIDB_DATABASE || 'test',
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true
    }
  });
  // ▲▲▲ 書き換えここまで ▲▲▲

  try {
    // MySQLに「今何時？」と聞くクエリを実行
    const [rows] = await connection.execute('SELECT NOW() as now');
    // 成功したら画面に時刻を表示
    res.status(200).json({
      message: '接続成功！MySQLと繋がりました！',
      time: rows[0].now
    });
  } catch (error) {
    // 失敗したらエラーを表示
    res.status(500).json({ error: error.message });
  } finally {
    // 必ず接続を閉じる
    await connection.end();
  }
}