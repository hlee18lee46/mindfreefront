'use client';

import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';

type EmotionLog = {
  _id: string;
  user_email: string;
  emotions: Record<string, number>;
  timestamp: string;
};

export default function HistoryPage() {
  const [logs, setLogs] = useState<EmotionLog[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const email = localStorage.getItem('userEmail');
      if (!email) return;

      const res = await fetch(`http://localhost:8000/emotion/history?user_email=${email}`);
      const data = await res.json();
      setLogs(data);
    };

    fetchLogs();
  }, []);

  return (
    <Layout>
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Emotion History</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {logs.map((log) => (
          <div key={log._id} className="bg-white rounded-xl shadow p-4 border border-indigo-100">
            <p className="text-sm text-gray-500 mb-1">
              {new Date(log.timestamp).toLocaleString()}
            </p>
            <ul className="text-sm text-gray-700">
              {Object.entries(log.emotions).map(([emotion, score]) => (
                <li key={emotion}>
                  <strong className="capitalize">{emotion}</strong>: {(score * 100).toFixed(1)}%
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Layout>
  );
}
