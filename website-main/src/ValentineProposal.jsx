import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Star } from 'lucide-react';

export default function ValentineProposal() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [showBigImage, setShowBigImage] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [floatingHearts, setFloatingHearts] = useState([]);

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

  const noMessages = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Pookie please? 🥺",
    "Think again!",
    "Don't break my heart!",
    "I'm gonna cry...",
    "Pretty please? 💔",
    "Last chance!",
    "Ms Aastha Bhore 😢"
  ];

  const handleNoHover = () => {
    const newX = Math.random() * 60 - 30;
    const newY = Math.random() * 60 - 30;
    setNoPosition({ x: newX, y: newY });
    setNoCount(Math.min(noCount + 1, noMessages.length - 1));
  };

  const handleYesClick = () => {
    setYesPressed(true);
    setShowBigImage(true);
    
    // After 2.5 seconds, transition to celebration
    setTimeout(() => {
      setShowCelebration(true);
    }, 2500);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Big image reveal screen
  if (showBigImage && !showCelebration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-500 via-pink-600 to-purple-700 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Explosion effect */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              animation: `explode 1.5s ease-out forwards`,
              animationDelay: `${i * 0.05}s`
            }}
          >
            <Heart className="text-red-300 fill-red-300" size={30} />
          </div>
        ))}

        {/* Big image that grows */}
        <div className="relative z-10 animate-[scaleIn_2s_ease-out]">
          <div className="w-96 h-96 rounded-full overflow-hidden border-8 border-white shadow-[0_0_100px_rgba(255,255,255,0.5)] animate-[rotate_2s_ease-in-out]">
            <img 
              src="/photos/IMG_0024.jpg" 
              alt="Love" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-pink-500/30 to-transparent animate-pulse"></div>
        </div>

        <style jsx>{`
          @keyframes scaleIn {
            0% { transform: scale(0) rotate(0deg); opacity: 0; }
            60% { transform: scale(1.2) rotate(180deg); }
            100% { transform: scale(1) rotate(360deg); opacity: 1; }
          }
          @keyframes explode {
            0% { transform: translate(-50%, -50%) translate(0, 0); opacity: 1; }
            100% { 
              transform: translate(-50%, -50%) translate(${Math.cos(Math.random() * Math.PI * 2) * 500}px, ${Math.sin(Math.random() * Math.PI * 2) * 500}px);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    );
  }

  // Celebration screen with orbiting images
  if (showCelebration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-400 via-pink-500 to-purple-600 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 2}s`
              }}
            >
              <Heart className="text-red-300 fill-red-300" size={Math.random() * 30 + 20} />
            </div>
          ))}
          {[...Array(30)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 3 + 1}s`
              }}
            >
              <Sparkles className="text-yellow-300" size={Math.random() * 25 + 15} />
            </div>
          ))}
        </div>

        {/* Orbiting images around the center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-[900px] h-[900px]">
            {/* Image 1 */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2" style={{ animation: 'orbit 15s linear infinite' }}>
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-2xl transform hover:scale-125 transition-all duration-300 pointer-events-auto animate-[wiggle_2s_ease-in-out_infinite]">
                <img src="/photos/IMG_0024.jpg" alt="Love" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Image 2 */}
            <div className="absolute top-32 right-32" style={{ animation: 'orbit 15s linear infinite', animationDelay: '-1.875s' }}>
              <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-white shadow-2xl transform hover:scale-125 transition-all duration-300 pointer-events-auto animate-[bounce_2.5s_ease-in-out_infinite]">
                <img src="/photos/IMG_6979.jpg" alt="Hearts" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Image 3 */}
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2" style={{ animation: 'orbit 15s linear infinite', animationDelay: '-3.75s' }}>
              <div className="w-36 h-36 rounded-2xl overflow-hidden border-4 border-white shadow-2xl transform hover:scale-125 transition-all duration-300 pointer-events-auto animate-pulse">
                <img src="/photos/IMG_8430.jpg" alt="Celebration" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Image 4 */}
            <div className="absolute bottom-32 right-32" style={{ animation: 'orbit 15s linear infinite', animationDelay: '-5.625s' }}>
              <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-white shadow-2xl transform hover:scale-125 transition-all duration-300 pointer-events-auto animate-[float_3s_ease-in-out_infinite]">
                <img src="/photos/IMG_9135.jpg" alt="Romance" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Image 5 */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2" style={{ animation: 'orbit 15s linear infinite', animationDelay: '-7.5s' }}>
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-2xl transform hover:scale-125 transition-all duration-300 pointer-events-auto animate-[wiggle_2.5s_ease-in-out_infinite]">
                <img src="/photos/IMG_9589.jpg" alt="Together" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Image 6 */}
            <div className="absolute bottom-32 left-32" style={{ animation: 'orbit 15s linear infinite', animationDelay: '-9.375s' }}>
              <div className="w-36 h-36 rounded-2xl overflow-hidden border-4 border-white shadow-2xl transform hover:scale-125 transition-all duration-300 pointer-events-auto animate-[bounce_3s_ease-in-out_infinite]">
                <img src="/photos/IMG_9595.jpg" alt="Love Story" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Image 7 */}
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2" style={{ animation: 'orbit 15s linear infinite', animationDelay: '-11.25s' }}>
              <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-white shadow-2xl transform hover:scale-125 transition-all duration-300 pointer-events-auto animate-pulse">
                <img src="/photos/IMG_9601.jpg" alt="Sweet" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Image 8 */}
            <div className="absolute top-32 left-32" style={{ animation: 'orbit 15s linear infinite', animationDelay: '-13.125s' }}>
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-2xl transform hover:scale-125 transition-all duration-300 pointer-events-auto animate-[float_3.5s_ease-in-out_infinite]">
                <img src="/photos/IMG_9636.jpg" alt="Forever" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-16 max-w-3xl text-center relative z-10 border-4 border-pink-200 animate-[fadeIn_1s_ease-out]">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <Star className="w-16 h-16 text-yellow-400 fill-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          
          <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-red-500 to-purple-600 mb-8 animate-[bounce_2s_ease-in-out_infinite]">
            YAAAY! 🎉
          </h1>
          
          <p className="text-4xl font-bold text-gray-800 mb-6 animate-[fadeIn_1.5s_ease-out]">
            I knew you'd say yes, Ms Aastha! ❤️
          </p>
          
          <p className="text-2xl text-gray-700 mb-8 animate-[fadeIn_2s_ease-out]">
            You just made me the happiest person in the universe!
          </p>
          
          <div className="flex justify-center gap-4 mb-8">
            {[...Array(5)].map((_, i) => (
              <Heart
                key={i}
                className="text-red-500 fill-red-500 animate-bounce"
                size={40}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          
          <p className="text-xl text-pink-600 font-semibold animate-pulse">
            Can't wait to celebrate Valentine's Day with you! 💕✨
          </p>
        </div>

        <style jsx>{`
          @keyframes orbit {
            from { transform: rotate(0deg) translateX(450px) rotate(0deg); }
            to { transform: rotate(360deg) translateX(450px) rotate(-360deg); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes wiggle {
            0%, 100% { transform: rotate(-5deg); }
            50% { transform: rotate(5deg); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}</style>
      </div>
    );
  }

  // Initial proposal screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-rose-400 to-red-400 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background hearts */}
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
          <Heart className="text-red-200 fill-red-200 opacity-40" size={heart.size} />
        </div>
      ))}

      {/* Cursor trail effect */}
      <div 
        className="fixed w-8 h-8 pointer-events-none z-50 transition-all duration-100"
        style={{ 
          left: mousePos.x - 16, 
          top: mousePos.y - 16,
        }}
      >
        <Heart className="text-pink-400 fill-pink-400 animate-pulse" />
      </div>

      <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-[0_20px_80px_rgba(219,39,119,0.4)] p-16 max-w-3xl text-center relative border-4 border-pink-300 animate-[fadeIn_1s_ease-out] z-10">
        {/* Decorative corners */}
        <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-pink-400 to-red-400 rounded-full animate-pulse"></div>
        <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-red-400 to-pink-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>

        <div className="mb-10 relative">
          <Heart className="w-28 h-28 mx-auto text-red-500 fill-red-500 animate-[heartBeat_1.5s_ease-in-out_infinite]" />
          <Sparkles className="w-12 h-12 absolute top-0 right-1/3 text-yellow-400 animate-spin" style={{ animationDuration: '4s' }} />
        </div>
        
        <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-red-500 to-purple-600 mb-6 animate-[slideDown_0.8s_ease-out] tracking-tight">
          Hey Aastha! 💕
        </h1>
        
        <div className="h-1 w-32 bg-gradient-to-r from-pink-400 to-red-400 mx-auto mb-8 rounded-full"></div>
        
        <p className="text-4xl font-bold text-gray-800 mb-16 animate-[slideUp_1s_ease-out]">
          Will you be my Valentine?
        </p>

        <div className="flex gap-8 items-center justify-center flex-wrap min-h-[120px]">
          <button
            onClick={handleYesClick}
            className="group relative px-16 py-8 bg-gradient-to-r from-pink-500 via-red-500 to-pink-500 hover:from-pink-600 hover:via-red-600 hover:to-pink-600 text-white text-3xl font-black rounded-full shadow-[0_10px_40px_rgba(236,72,153,0.6)] transform transition-all duration-300 hover:scale-110 hover:shadow-[0_15px_50px_rgba(236,72,153,0.8)] animate-[pulse_2s_ease-in-out_infinite] border-4 border-white"
          >
            <span className="relative z-10 flex items-center gap-3">
              Yes! 💖
              <Heart className="fill-white animate-bounce" />
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-pink-400 blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
          </button>
          
          <button
            onMouseEnter={handleNoHover}
            onClick={handleNoHover}
            style={{
              transform: `translate(${noPosition.x}px, ${noPosition.y}px)`
            }}
            className="relative px-12 py-6 bg-gray-200 hover:bg-gray-300 text-gray-700 text-2xl font-bold rounded-full shadow-lg transition-all duration-500 ease-out border-2 border-gray-300"
          >
            {noMessages[noCount]}
          </button>
        </div>

        {noCount > 3 && (
          <p className="mt-12 text-xl text-pink-600 font-semibold animate-[wiggle_1s_ease-in-out_infinite] italic">
            The "Yes" button is looking pretty irresistible right now... 😊✨
          </p>
        )}

        {noCount > 6 && (
          <p className="mt-4 text-lg text-red-500 font-bold animate-pulse">
            Come on Aastha, you know you want to say yes! 💕
          </p>
        )}
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
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.1); }
          50% { transform: scale(1); }
          75% { transform: scale(1.15); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
      `}</style>
    </div>
  );
}
