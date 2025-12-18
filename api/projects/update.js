import { getDbConnection } from '../_db.js';

export default async function handler(req, res) {
  if (req.method !== 'PUT') return res.status(405).json({ error: 'Method not allowed' });
  const { id, client_name, project_name, status, budget, deadline, memo } = req.body;
  let connection;
  try {
    connection = await getDbConnection();
    await connection.execute(
      'UPDATE projects SET client_name=?, project_name=?, status=?, budget=?, deadline=?, memo=? WHERE id=?',
      [client_name, project_name, status, budget, deadline, memo, id]
    );
    res.status(200).json({ message: '案件を更新しました' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) await connection.end();
  }
}