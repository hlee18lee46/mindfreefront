'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';

// ✅ Meditation track options
const trackMap: Record<string, string> = {
    'Ambient Meditation': '/sounds/ambient_meditation.m4a',
    'Clear Sky': '/sounds/clear_sky.m4a',
    'In Meditation': '/sounds/in-meditation.m4a',
    'Rainstick Cascade': '/sounds/rainstick-cascade.mp3',
    'Tibetan Bowl': '/sounds/tibetan-bowl.mp3',
    '432 Hz Healing Frequency': '/sounds/432-Hz-Healing-Frequency-Meditation_AdobeStock_626143226_preview.m4a',
    'Amazing Flute': '/sounds/Amazing-Flute_AdobeStock_553459696_preview.m4a',
    'Dreamy Peaceful Meditation': '/sounds/DREAMY-PEACEFUL-MEDITATION-(AEROSOLS)_AdobeStock_829170052_preview.m4a',
    'Light Rain Reminiscence': '/sounds/Light-Rain-Reminiscence_AdobeStock_357613052_preview.m4a',
    'Mellow Ambient Peaceful': '/sounds/Mellow-Ambient-Peaceful-Meditation-Cinematic---Loopable-Edit_AdobeStock_1294703353_preview.m4a',
    'Peaceful Piano': '/sounds/Peaceful-Piano-Music-for-Relax_AdobeStock_506618410_preview.m4a',
  };

const trackTitles = Object.keys(trackMap);

export default function MeditatePage() {
  const [recommendation, setRecommendation] = useState<{
    title: string;
    reason: string;
  } | null>(null);

  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);

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
    setSelectedTrack(result.title); // Auto-select recommended
  };

  return (
    <Layout>
      <div className="flex flex-col h-full max-h-full relative">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">Meditation Room 🧘</h1>

        {/* Gemini Recommendation */}
        <button
          onClick={handleRequest}
          className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 w-fit"
        >
          Get Meditation Recommendation
        </button>

        {recommendation && (
          <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
            <p className="text-lg font-semibold text-indigo-800 mb-2">
              Gemini recommends: {recommendation.title}
            </p>
            <p className="text-sm text-gray-600 mb-2 italic">{recommendation.reason}</p>
          </div>
        )}

        {/* Manual Track Selector */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <p className="font-semibold text-indigo-800 mb-2">🎵 Choose your meditation track:</p>
          <select
            value={selectedTrack ?? ''}
            onChange={(e) => setSelectedTrack(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 mb-4"
          >
            <option value="" disabled>Select a track</option>
            {trackTitles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>

          {/* Audio player */}
          {selectedTrack && (
            <div>
              <p className="mb-2">Now playing: <strong>{selectedTrack}</strong></p>
              <audio key={selectedTrack} controls autoPlay className="w-full">
  <source src={trackMap[selectedTrack]} />
  Your browser does not support the audio element.
</audio>

            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
