'use client';

import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';

interface Anchor {
  txId: string;
  metadata: {
    timestamp: string;
    sha256: string;
    type: string;
  };
  createdAt: string;
}

export default function AnchorHistory() {
  const [anchors, setAnchors] = useState<Anchor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;
  
    fetch(`http://localhost:6300/api/midnight/anchors/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('🚀 Anchor Data:', data);
  
        if (data?.anchors && Array.isArray(data.anchors)) {
          setAnchors(data.anchors);
        } else {
          console.warn('⚠️ No anchors array found in response:', data);
          setAnchors([]); // Explicitly clear
        }
      })
      
      .catch((err) => {
        console.error('❌ Failed to fetch anchors:', err);
        setAnchors([]); // Handle error fallback
      });
  }, []);
  console.log('🧩 Anchors in state:', anchors);
  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">🪙 Smart Contract Anchors</h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : anchors.length === 0 ? (
          <p className="text-gray-500">No anchors found1.</p>
        ) : (
          <div className="space-y-4">
            {anchors.map((anchor, idx) => (
              <div key={idx} className="p-4 border rounded-lg bg-white shadow-md">
                <p className="font-semibold">
                  Tx ID: <span className="text-gray-700">{anchor.txId}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Hash: {anchor.metadata?.sha256 || 'N/A'}
                </p>
                <p className="text-sm text-gray-500">
                  Anchored at: {new Date(anchor.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}