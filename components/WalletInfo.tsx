'use client';

import { useEffect, useState } from 'react';
import { Copy } from 'lucide-react';

export default function WalletInfo() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    fetch(`http://localhost:6300/api/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setWalletAddress(data.wallet?.address || null);
        setEmail(data.email || null);
      })
      .catch((err) => console.error('❌ Failed to fetch wallet info:', err));
  }, []);

  const handleCopy = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 w-80 ring-1 ring-indigo-100">
      {email && (
        <div className="mb-2">
          <p className="text-sm font-semibold text-indigo-600">Email</p>
          <p className="text-sm text-gray-700">{email}</p>
        </div>
      )}

      {walletAddress && (
        <div>
          <p className="text-sm font-semibold text-indigo-600 mb-1">Wallet Address</p>
          <div className="flex items-center gap-2">
            <p className="text-xs font-mono break-all flex-1">{walletAddress}</p>
            <button onClick={handleCopy} title="Copy">
              <Copy size={14} className="text-indigo-500 hover:text-indigo-700" />
            </button>
          </div>
          {copied && <p className="text-xs text-green-500 mt-1">Copied!</p>}
        </div>
      )}
    </div>
  );
}
