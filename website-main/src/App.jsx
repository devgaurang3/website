// src/App.jsx
import React, { useState, useEffect } from 'react';
import ValentineProposal from './ValentineProposal';
import { Heart, Sparkles } from 'lucide-react';

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [floatingHearts, setFloatingHearts] = useState([]);

  const KEY = 'ENTER-KEY-HERE'; // your secret key

  // Floating hearts effect
  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingHearts(prev => [
        ...prev.slice(-15),
        {
          id: Date.now(),
          x: Math.random() * 100,
          y: 110,
          size: Math.random() * 20 + 15,
          delay: Math.random() * 2
        }
      ]);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === KEY) {
      setUnlocked(true);
    } else {
      alert('Oops! Wrong key 💔');
      setPassword('');
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-rose-300 to-red-300 flex items-center justify-center p-4 relative overflow-hidden">
        
        {/* Floating hearts */}
        {floatingHearts.map(heart => (
          <div
            key={heart.id}
            className="absolute pointer-events-none animate-[floatUp_6s_ease-in_forwards]"
            style={{
              left: `${heart.x}%`,
              bottom: `${heart.y}%`,
              animationDelay: `${heart.delay}s`
            }}
          >
            <Heart className="text-red-300 fill-red-300 opacity-50" size={heart.size} />
          </div>
        ))}

        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_20px_80px_rgba(219,39,119,0.4)] p-12 max-w-md text-center border-4 border-pink-300 animate-[fadeIn_1s_ease-out] z-10">
          <Heart className="w-16 h-16 mx-auto text-red-500 fill-red-500 animate-[heartBeat_1.5s_ease-in-out_infinite]" />
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-red-500 to-purple-600 my-6">
            Welcome, my Valentine! 💌
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Enter your bday (DDYYMMYY) + my bday (MMDYYYDY) + date when the planets aligned (DDMMYYYY) + 85^2 . The dev apologiese for the bug - pls claim 1 free kissy ❤️✨
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Type the key..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 text-xl rounded-lg border-2 border-pink-300 focus:outline-none focus:border-pink-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-pink-500 via-red-500 to-pink-500 hover:from-pink-600 hover:via-red-600 hover:to-pink-600 text-white font-bold rounded-lg text-2xl transition-all shadow-lg hover:scale-105 animate-[pulse_2s_ease-in-out_infinite]"
            >
              Unlock 💖
            </button>
          </form>
          <Sparkles className="absolute top-4 right-4 text-yellow-300 w-8 h-8 animate-spin" />
        </div>

        <style jsx>{`
          @keyframes floatUp {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            10% { opacity: 0.6; }
            90% { opacity: 0.6; }
            100% { transform: translateY(-120vh) rotate(360deg); opacity: 0; }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes heartBeat {
            0%, 100% { transform: scale(1); }
            25% { transform: scale(1.1); }
            50% { transform: scale(1); }
            75% { transform: scale(1.15); }
          }
        `}</style>
      </div>
    );
  }

  // Password correct → show main Valentine page
  return <ValentineProposal />;
}
