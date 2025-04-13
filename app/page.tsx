'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const rotatingMessages = [
  'Need a therapist?',
  'What\'s on your mind?..',
  'Free your mind today.',
  'It\'s Okay to be not Okay.'
];

const rotatingImages = [
  '/therapy4.png',
  '/therapy5.png',
  '/therapy6.png'

]; // 📸 Add these images to /public/

export default function HomePage() {
  const [currentMsgIndex, setCurrentMsgIndex] = useState(0);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMsgIndex((prev) => (prev + 1) % rotatingMessages.length);
      setCurrentImgIndex((prev) => (prev + 1) % rotatingImages.length);
    }, 3000); // every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#fef9f3] overflow-hidden">


      {/* Left Text Section */}
      <div className="w-full lg:w-1/3 flex flex-col justify-center items-start px-10 py-16 space-y-6 z-10">
      
        <AnimatePresence mode="wait">
          <motion.h1
            key={rotatingMessages[currentMsgIndex]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-bold text-gray-900"
          >
            {rotatingMessages[currentMsgIndex]}
          </motion.h1>
        </AnimatePresence>

        <ul className="text-gray-700 space-y-2 text-md">
          <li>• Start with MindFree.AI</li>
          <li>• Tell us your stories, what has been difficult?</li>
          <li>• Mediate, and Heal</li>
          <li>• Check your journey</li>
        </ul>

        <div className="flex space-x-4">
          <a
            href="/login"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
          >
            Log In
          </a>
          <a
            href="/create-account"
            className="border border-indigo-600 text-indigo-600 hover:bg-indigo-100 font-semibold px-6 py-2 rounded-lg transition"
          >
            Get Started
          </a>
          
        </div>
        <div className="flex justify-start mb-4">
  <Image src="/logo.png" alt="MindFree Logo" width={260} height={260} />
</div>
      </div>

      {/* Right Image Section */}
{/* Right Image Section */}
<div className="w-full lg:w-2/3 relative h-[400px] lg:h-screen">
  <AnimatePresence mode="wait">
    <motion.div
      key={rotatingImages[currentImgIndex]}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0"
    >
      <Image
        src={rotatingImages[currentImgIndex]}
        alt="MindFree Hero"
        layout="fill"
        objectFit="cover"
        className="rounded-l-3xl"
        priority
      />
    </motion.div>
  </AnimatePresence>
</div>

    </div>
  );
}
