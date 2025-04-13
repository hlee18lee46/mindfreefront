'use client';

import { useEffect, useState } from 'react';

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

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    fetch(`http://localhost:6300/api/midnight/anchors/${userId}`)
      .then((res) => res.json())
      .then((data) => setAnchors(data.anchors || []));
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md mt-8">
      <h2 className="text-xl font-bold text-indigo-700 mb-4">🪙 Smart Contract Anchors</h2>
      <div className="space-y-4">
        {anchors.map((anchor, idx) => (
          <div key={idx} className="p-4 border rounded-lg bg-gray-50">
            <p className="font-semibold">Tx ID: <span className="text-gray-700">{anchor.txId}</span></p>
            <p className="text-sm text-gray-600 break-all">Hash: {anchor.metadata.sha256}</p>
            <p className="text-sm text-gray-500">Anchored at: {new Date(anchor.createdAt).toLocaleString()}</p>
          </div>
        ))}
        {anchors.length === 0 && (
          <p className="text-sm text-gray-500 italic">No anchors found.</p>
        )}
      </div>
    </div>
  );
}