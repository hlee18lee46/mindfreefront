'use client';

import { useState, useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import * as faceapi from 'face-api.js';

type ChatMessage = {
  role: 'user' | 'ai';
  content: string;
};

export default function SessionPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [emotions, setEmotions] = useState<{ [key: string]: number } | null>(null);

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load models & start camera
  useEffect(() => {
    async function loadModelsAndCamera() {
        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceExpressionNet.loadFromUri('/models') // 👈 add this line
          ]);
          

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }

    loadModelsAndCamera();
  }, []);

  // Face detection loop
  useEffect(() => {
    const interval = setInterval(async () => {
      if (!videoRef.current || !canvasRef.current) return;
  
      const video = videoRef.current;
      const canvas = canvasRef.current;
  
      const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();
    
      const displaySize = {
        width: video.offsetWidth,
        height: video.offsetHeight
      };
  
      // Match canvas to video
      faceapi.matchDimensions(canvas, displaySize);
  
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
  
      const context = canvas.getContext('2d');
      if (!context) return;
  
      context.clearRect(0, 0, canvas.width, canvas.height);
  
      resizedDetections.forEach((detection) => {
        const box = detection.detection.box;
        const expressions = detection.expressions;
      
        context.strokeStyle = 'purple';
        context.lineWidth = 2;
        context.strokeRect(box.x, box.y, box.width, box.height);
      
        if (expressions) {
            const sorted = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
            context.fillStyle = 'purple';
            context.font = '14px sans-serif';
            
            sorted.slice(0, 3).forEach(([emotion, score], i) => {
              const text = `${emotion}: ${(score * 100).toFixed(1)}%`;
              context.fillText(text, box.x, box.y - 10 - i * 18);
            });
            
            const top3 = Object.fromEntries(sorted.slice(0, 3));

            const user_email = localStorage.getItem('userEmail');
            const payload = {
              user_email,
              emotions: top3,
              timestamp: new Date().toISOString()
            };
          
            fetch('http://localhost:8000/log_emotion', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            }).catch((err) => console.error("❌ Emotion log failed:", err));

          console.log('🧠 Emotion scores:', expressions);

        }
      });
      
      
    }, 100);
  
    return () => clearInterval(interval);
  }, []);
  

const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage: ChatMessage = { role: 'user', content: input };
  setMessages((prev) => [...prev, userMessage]);
  setInput('');
  setLoading(true);

  try {
    const res = await fetch('http://localhost:8000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_input: input,
        user_email: localStorage.getItem('userEmail') // ✅ backend expects this
      }),      
    });

    const data = await res.json();
    setMessages((prev) => [...prev, { role: 'ai', content: data.response }]);
  } catch (err) {
    console.error('❌ Chat error:', err);
  } finally {
    setLoading(false);
  }
};


  return (
    <Layout>
      <div className="flex flex-col h-full max-h-full relative">
        <h1 className="text-2xl font-bold text-indigo-700 mb-4">Therapy Session</h1>

        {/* Camera with overlay */}
        <div className="relative mb-4 w-full max-w-md flex justify-center mx-auto">
  <video
    ref={videoRef}
    autoPlay
    playsInline
    muted
    className="rounded-xl shadow-md border border-indigo-200 w-full h-auto"
  />
  <canvas
    ref={canvasRef}
    className="absolute top-0 left-0 z-10 w-full h-full pointer-events-none"
  />
</div>


        {/* Chat box */}
        <div className="flex-1 overflow-y-auto space-y-4 bg-indigo-50 rounded-lg p-4 shadow-inner">
        {messages.map((msg, index) => (
  <div
    key={index}
    className={`px-4 py-3 rounded-2xl whitespace-pre-wrap break-words leading-relaxed shadow ${
      msg.role === 'user'
        ? 'bg-indigo-600 text-white self-end ml-auto max-w-[70%]'
        : 'bg-white text-gray-800 self-start mr-auto max-w-[80%] border border-gray-200'
    }`}
    style={{
      fontSize: '1rem',
      lineHeight: '1.6',
      wordBreak: 'break-word',
    }}
  >
    {msg.content}
  </div>
))}


          {loading && <p className="text-sm text-gray-500 italic">Gemini is typing...</p>}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="mt-4 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Share how you're feeling..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:outline-none"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </Layout>
  );
}
