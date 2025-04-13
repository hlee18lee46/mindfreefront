'use client';

import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';

interface Wallet {
  address: string;
}

interface UserData {
  email: string;
  wallet: Wallet;
}

interface Anchor {
  txId: string;
  metadata: {
    timestamp: string;
    sha256: string;
    type: string;
  };
  createdAt: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [anchors, setAnchors] = useState<Anchor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    // Fetch user data
    fetch(`http://localhost:6300/api/user/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error('❌ User fetch failed:', err))
      .finally(() => setLoading(false));

    // Fetch anchor logs
    fetch(`http://localhost:6300/api/midnight/anchors/${userId}`)
      .then(res => res.json())
      .then(data => setAnchors(data.anchors || []))
      .catch(err => console.error('❌ Anchor fetch failed:', err));
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-indigo-700">Dashboard</h1>

        {loading ? (
          <p className="text-gray-600">Loading your profile...</p>
        ) : user ? (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Email</h2>
              <p className="text-gray-800">{user.email}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Wallet Address</h2>
              <p className="text-sm break-all text-gray-800">{user.wallet.address}</p>
            </div>
          </div>
        ) : (
          <p className="text-red-500">User not found. Please log in again.</p>
        )}

        {/* 🔽 Anchors Section */}
        <div className="pt-6 border-t mt-6">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">🪙 Smart Contract Anchors</h2>
          {anchors.length === 0 ? (
            <p className="text-gray-600">No anchors found.</p>
          ) : (
            <div className="space-y-4">
              {anchors.map((anchor, idx) => (
                <div key={idx} className="p-4 border rounded-lg bg-white shadow-md">
                  <p className="font-semibold">Tx ID: <span className="text-gray-700">{anchor.txId}</span></p>
                  <p className="text-sm text-gray-600">Hash: {anchor.metadata.sha256}</p>
                  <p className="text-sm text-gray-500">Anchored at: {new Date(anchor.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}