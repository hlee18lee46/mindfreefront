'use client';

import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const links = [
  { name: 'Home', href: '/dashboard' },
  { name: 'Session', href: '/session' },
  { name: 'Meditate', href: '/meditate' },
  { name: 'History', href: '/history' },
  { name: 'Progress', href: '/progress' },
  { name: 'Log Out', href: '/' },

];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="h-full flex flex-col justify-between"
    >
      <div className="space-y-8 p-4">
        <div className="text-2xl font-extrabold tracking-wide text-white drop-shadow">MindFree.AI</div>
        <ul className="space-y-3">
          {links.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => router.push(link.href)}
                className={clsx(
                  'w-full text-left px-2 py-1 rounded-md transition duration-200',
                  pathname === link.href
                    ? 'bg-white/20 text-blue-100 font-semibold'
                    : 'text-white/90 hover:bg-white/10 hover:text-blue-200'
                )}
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-xs text-white/70 p-4">© 2025 MindFree.AI</div>
    </motion.nav>
  );
}
