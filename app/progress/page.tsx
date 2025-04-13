'use client';

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Layout from '@/components/Layout';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

const emotionList = ['neutral', 'angry', 'sad', 'surprised', 'happy', 'disgusted'];

export default function ProgressPage() {
  const [data, setData] = useState([]);
  const [selectedEmotion, setSelectedEmotion] = useState('neutral');

  useEffect(() => {
    const fetchData = async () => {
      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) return;

      const res = await fetch(`http://localhost:8000/emotion/history_asc?user_email=${encodeURIComponent(userEmail)}`);
      const result = await res.json();
      setData(result || []);
    };

    fetchData();
  }, []);

  const graphData = {
    labels: data.map((item: any, index: number) =>
      index % 5 === 0
        ? new Date(item.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })
        : ''
    ),
    datasets: [
      {
        label: `${selectedEmotion} %`,
        data: data.map((item: any) =>
          item.emotions?.[selectedEmotion] != null ? item.emotions[selectedEmotion] * 100 : 0
        ),
        fill: false,
        borderColor: '#6366f1',
        tension: 0.2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: `Emotion Trend: ${selectedEmotion}` },
    },
    scales: {
      y: { beginAtZero: true, max: 100 },
    },
  };

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">Emotion Progress</h2>

        <div className="mb-6">
          <label className="mr-2 text-sm font-medium">Select Emotion:</label>
          <select
            className="border px-3 py-2 rounded-lg shadow-sm"
            value={selectedEmotion}
            onChange={(e) => setSelectedEmotion(e.target.value)}
          >
            {emotionList.map((emotion) => (
              <option key={emotion} value={emotion}>
                {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <Line data={graphData} options={options} />
        </div>
      </div>
    </Layout>
  );
}