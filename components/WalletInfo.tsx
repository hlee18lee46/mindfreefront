'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy } from 'lucide-react';

export default function LaceConnect() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const fetchedRef = useRef(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!dropdownOpen || fetchedRef.current) return;

    const fetchUserDetails = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      try {
        const response = await fetch(`http://localhost:6300/api/user/${userId}`);
        const data = await response.json();
        setWalletAddress(data.wallet?.address || null);
        setEmail(data.email || null);
        fetchedRef.current = true;
      } catch (err) {
        console.error('❌ Failed to fetch user details:', err);
      }
    };

    fetchUserDetails();
  }, [dropdownOpen]);

  const handleCopy = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="absolute top-6 right-6 z-50">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-5 py-2 rounded-lg shadow-sm transition duration-200"
      >
        {dropdownOpen ? 'Hide Wallet' : 'Show Wallet'}
      </button>

      <AnimatePresence>
        {dropdownOpen && (walletAddress || email) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mt-3 bg-slate-50 text-slate-700 rounded-xl shadow-lg ring-1 ring-indigo-100 p-5 w-80 break-words"
          >
            <div className="space-y-4">
              {email && (
                <div>
                  <p className="text-sm font-semibold text-indigo-600">Email</p>
                  <p className="text-sm">{email}</p>
                </div>
              )}

              {walletAddress && (
                <div>
                  <p className="text-sm font-semibold text-indigo-600 mb-1">Wallet Address</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-mono break-all flex-1">{walletAddress}</p>
                    <button
                      onClick={handleCopy}
                      className="text-xs text-indigo-500 hover:text-indigo-700"
                      title="Copy"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                  {copied && <p className="text-xs text-green-500 mt-1">Copied!</p>}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
