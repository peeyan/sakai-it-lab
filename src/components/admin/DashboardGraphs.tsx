import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

// Chart.jsを使うための「登録」作業（おまじない）
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

type Achievement = { hours: number };
type Project = { status: string; budget: number; client_name: string };

type Props = {
  achievements: Achievement[];
  projects: Project[];
};

export const DashboardGraphs: React.FC<Props> = ({ achievements, projects }) => {
  // 1. 計算ロジック：合計時間を出す
  const totalHours = achievements.reduce((sum, item) => sum + item.hours, 0);

  // 2. 計算ロジック：総売上を出す
  const totalSales = projects.reduce((sum, item) => sum + item.budget, 0);

  // 3. 計算ロジック：ステータスごとの件数を集計（円グラフ用）
  const statusCounts: { [key: string]: number } = {};
  projects.forEach((p) => {
    statusCounts[p.status] = (statusCounts[p.status] || 0) + 1;
  });

  const pieData = {
    labels: Object.keys(statusCounts), // ['未対応', '作業中'...]
    datasets: [
      {
        data: Object.values(statusCounts), // [2, 5...]
        backgroundColor: [
          '#E5E7EB', // 未対応 (Gray)
          '#93C5FD', // 見積中 (Blue)
          '#FCD34D', // 作業中 (Yellow)
          '#34D399', // 完了 (Green)
          '#F87171', // 保留 (Red)
        ],
        borderWidth: 1,
      },
    ],
  };

  // 4. 計算ロジック：売上トップ5（棒グラフ用）
  // 売上が高い順に並び替え
  const sortedProjects = [...projects].sort((a, b) => b.budget - a.budget).slice(0, 5);
  
  const barData = {
    labels: sortedProjects.map(p => p.client_name),
    datasets: [
      {
        label: '受注金額 (円)',
        data: sortedProjects.map(p => p.budget),
        backgroundColor: 'rgba(79, 70, 229, 0.7)', // Indigo
      },
    ],
  };

  return (
    <div className="mb-10">
      {/* ▼▼▼ スコアカードエリア ▼▼▼ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-500">
          <p className="text-gray-500 font-bold text-sm">💰 累計受注額</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            ¥{totalSales.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
          <p className="text-gray-500 font-bold text-sm">⏱️ 業務削減時間</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {totalHours} <span className="text-lg text-gray-400">時間</span>
          </p>
        </div>
      </div>

      {/* ▼▼▼ グラフエリア ▼▼▼ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 円グラフ */}
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
          <h3 className="text-lg font-bold text-gray-700 mb-4">📊 案件ステータス状況</h3>
          <div className="w-64">
            {projects.length > 0 ? <Pie data={pieData} /> : <p className="text-gray-400">データなし</p>}
          </div>
        </div>

        {/* 棒グラフ */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-bold text-gray-700 mb-4">🏆 売上ランキング (Top 5)</h3>
          {projects.length > 0 ? (
            <Bar 
              data={barData} 
              options={{ responsive: true, plugins: { legend: { display: false } } }} 
            />
          ) : (
            <p className="text-center text-gray-400 mt-10">データなし</p>
          )}
        </div>
      </div>
    </div>
  );
};