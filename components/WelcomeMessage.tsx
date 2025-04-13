'use client';

import { useEffect, useState } from 'react';

export default function WelcomeMessage() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    setEmail(storedEmail);
  }, []);

  return (
    <h1 className="text-2xl font-bold text-gray-800">
      🧘‍♂️ Welcome back to MindFree {email && <span className="ml-2 text-indigo-600">{email}</span>}
    </h1>
  );
}
