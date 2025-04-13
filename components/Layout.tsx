'use client';

import { motion } from 'framer-motion';
import Navbar from './Navbar';
import WalletInfo from './WalletInfo';
import WelcomeMessage from './WelcomeMessage';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden font-sans bg-gradient-to-tr from-slate-50 to-indigo-50 text-gray-800">
      {/* Sidebar with animation */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-1/6 bg-indigo-400/60 backdrop-blur-lg text-white shadow-xl p-4"
      >
        <Navbar />
      </motion.div>

      {/* Middle content area */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col flex-1 bg-white rounded-lg shadow-md m-4 overflow-hidden"
      >
        {/* Welcome Message Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <WelcomeMessage />
        </div>

        {/* Main content */}
        <div className="flex-1 px-6 py-6 overflow-y-auto flex flex-col">
  <div className="flex-1 overflow-y-auto">{children}</div>
</div>

      </motion.div>

      {/* Wallet panel with subtle animation */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-1/4 bg-white/90 backdrop-blur-md p-6 rounded-l-xl shadow-xl m-4"
      >
        <WalletInfo />
      </motion.div>
    </div>
  );
}
