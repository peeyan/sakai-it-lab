import { getDbConnection } from '../_db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { client_name, project_name, status, budget, deadline, memo } = req.body;

  if (!client_name || !project_name) return res.status(400).json({ error: '必須項目がありません' });

  const connection = await getDbConnection();
  try {
    await connection.execute(
      'INSERT INTO projects (client_name, project_name, status, budget, deadline, memo) VALUES (?, ?, ?, ?, ?, ?)',
      [client_name, project_name, status || '未対応', budget || 0, deadline, memo || '']
    );
    res.status(200).json({ message: '案件を登録しました' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await connection.end();
  }
}