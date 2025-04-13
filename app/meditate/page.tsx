// pages/meditate.tsx or components/MeditatePage.tsx (wherever your Meditate page is)

'use client';

import { useState } from 'react';

// ✅ Define trackMap at the top
const trackMap: Record<string, string> = {
  'Ambient Meditation': '/sounds/ambient_meditation.m4a',
  'Clear Sky': '/sounds/clear_sky.m4a',
  'In Meditation': '/sounds/in-meditation.m4a',
  'Rainstick Cascade': '/sounds/rainstick-cascade.mp3',
  'Tibetan Bowl': '/sounds/tibetan-bowl.mp3',
};

export default function MeditatePage() {
  const [recommendation, setRecommendation] = useState<{
    title: string;
    reason: string;
  } | null>(null);

  const handleRequest = async () => {
    const res = await fetch('http://localhost:8000/gemini/meditate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_email: localStorage.getItem('userEmail'),
        user_input: 'I want to relax',
      }),
    });

    const result = await res.json();
    setRecommendation(result);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-indigo-700 mb-4">Meditation Recommendation</h2>
      <button
        onClick={handleRequest}
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Get Meditation Track
      </button>

      {recommendation && (
        <div className="bg-white p-4 rounded shadow">
          <p className="font-semibold">Now playing: {recommendation.title}</p>
          <p className="text-sm text-gray-600 mb-2">{recommendation.reason}</p>
          <audio controls autoPlay>
            <source src={trackMap[recommendation.title]} />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}
