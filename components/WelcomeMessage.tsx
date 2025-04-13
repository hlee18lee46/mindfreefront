

'use client';

import { useEffect, useState } from 'react';
import WalletInfo from './WalletInfo';

export default function WelcomeMessage() {
  const [hovering, setHovering] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  return (
    <div
      className="relative flex justify-between items-center"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
    <h1 className="text-2xl font-bold text-gray-800">
      🧘‍♂️ Welcome back to MindFree! {email && <span className="ml-2 text-indigo-600">{email}</span>}
    </h1>

      {/* Wallet Button */}
      <div className="relative">
        <button
          className="bg-indigo-400/40 hover:bg-indigo-500/50 text-white text-sm px-4 py-1 rounded-md shadow transition"
        >
          My Wallet
        </button>

        {/* Hover-reveal wallet info */}
        {hovering && (
          <div className="absolute right-0 top-10 z-50">
            <WalletInfo />
          </div>
        )}
      </div>
    </div>
  );
}
