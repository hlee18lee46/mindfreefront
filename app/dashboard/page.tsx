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

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    const fetchUserData = async () => {
      try {
        const res = await fetch(`http://localhost:6300/api/user/${userId}`);
        const data = await res.json();

        if (res.ok) {
          setUser(data);
        }
      } catch (err) {
        console.error('❌ Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
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
      </div>
    </Layout>
  );
}
