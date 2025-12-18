import { getDbConnection } from '../_db.js';

export default async function handler(req, res) {
  // PUTメソッド（更新）以外は拒否
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id, title, hours } = req.body;

  // IDがないと何を更新していいか分からないのでエラーにする
  if (!id || !title || !hours) {
    return res.status(400).json({ error: '入力内容が足りません' });
  }

  try {
    const connection = await getDbConnection();

    // データを更新するSQL（UPDATE文）
    await connection.execute(
      'UPDATE achievements SET title = ?, hours = ? WHERE id = ?',
      [title, hours, id]
    );

    await connection.end();
    res.status(200).json({ message: '更新成功！' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}