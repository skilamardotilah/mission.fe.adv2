import { useState, useRef, useEffect } from 'react';
import { useWatchProgress } from '../../contexts/WatchProgressContext.jsx';

const asset = (p) => new URL(`../../assets/${p}`, import.meta.url).href;

export default function FilmPlayer({ onClose, itemId, type = 'film' }) {
  const [activePopup, setActivePopup] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);
  const { updateProgress } = useWatchProgress();

  const togglePopup = (id) => {
    if (activePopup === id) {
      setActivePopup(null);
    } else {
      setActivePopup(id);
    }
  };

  const play = () => {
    setIsPlaying(!isPlaying);
    // Implementasi play/pause video
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const seekVideo = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const setSpeed = (speed) => {
    setCurrentSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setActivePopup(null);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleClose = () => {
    // Update progress before closing
    if (itemId && duration > 0) {
      const progressPercentage = Math.round((currentTime / duration) * 100);
      updateProgress(itemId, progressPercentage);
    }
    onClose();
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const isButton = e.target.closest('button[onClick*="togglePopup"]');
      const isPopup = e.target.closest('[id$="Popup"]') || e.target.closest('[id$="Menu"]') || e.target.closest('[id$="Episode"]') || e.target.closest('[id$="terjemahan"]');
      
      if (!isButton && !isPopup) {
        setActivePopup(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="bg-[#181A1C] text-white font-lato relative w-full h-screen overflow-hidden">
      {/* Close Button */}
      <button onClick={handleClose} className="absolute top-4 right-4 z-20 bg-black/60 rounded-full p-2 text-white hover:text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Skip Intro Button */}
      <button className="absolute bottom-28 right-6 bg-white text-black text-base px-5 py-1.5 rounded-full z-[10] hover:bg-gray-200 transition shadow-md">
        Lewati Intro
      </button>

      {/* Video Container */}
      <div className="relative w-full h-screen bg-black overflow-hidden">
        <img src={asset('img/film/bg-tonton-movie.png')} alt="Background" className="w-full h-full object-cover" />
        
        {/* Play/Pause Button di Tengah */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button onClick={play} className="p-8">
            <svg xmlns="http://www.w3.org/2000/svg" height="80px" viewBox="0 -960 960 960" width="80px" fill="#D9D9D9">
              <path d="M360-320h80v-320h-80v320Zm160 0h80v-320h-80v320ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>
          </button>
        </div>

        {/* Video Controls di Bawah */}
        <div className="absolute bottom-0 w-full px-6 py-4 bg-black/60 text-white">
          <div className="flex items-center justify-between">
            {/* Controls Kiri */}
            <div className="flex items-center gap-4">
              <button title="play" onClick={play}>
                <svg xmlns="http://www.w3.org/2000/svg" height="60px" viewBox="0 -960 960 960" width="60px" fill="#FFFFFF">
                  <path d="M400-280v-400l200 200-200 200Z" />
                </svg>
              </button>
              
              <button title="Mundur 10 detik" onClick={() => seekVideo(-10)}>
                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF">
                  <path d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440h80q0 117 81.5 198.5T480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720h-6l62 62-56 58-160-160 160-160 56 58-62 62h6q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80ZM360-320v-180h-60v-60h120v240h-60Zm140 0q-17 0-28.5-11.5T460-360v-160q0-17 11.5-28.5T500-560h80q17 0 28.5 11.5T620-520v160q0 17-11.5 28.5T580-320h-80Zm20-60h40v-120h-40v120Z" />
                </svg>
              </button>

              <button title="Maju 10 detik" onClick={() => seekVideo(10)}>
                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF">
                  <path d="M360-320v-180h-60v-60h120v240h-60Zm140 0q-17 0-28.5-11.5T460-360v-160q0-17 11.5-28.5T500-560h80q17 0 28.5 11.5T620-520v160q0 17-11.5 28.5T580-320h-80Zm20-60h40v-120h-40v120ZM480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-800h6l-62-62 56-58 160 160-160 160-56-58 62-62h-6q-117 0-198.5 81.5T200-440q0 117 81.5 198.5T480-160q117 0 198.5-81.5T760-440h80q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Z" />
                </svg>
              </button>
              
              <button title="Volume">
                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF">
                  <path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z" />
                </svg>
              </button>
            </div>

            {/* Title di Tengah */}
            <div className="text-base font-medium text-gray-200">
              TED Lasso Episode 1: Pilot
            </div>

            {/* Controls Kanan */}
            <div className="flex items-center gap-4 relative text-white justify-center">
              {/* Next Episode Button */}
              <button onClick={() => togglePopup('nextEpisode')} title="Episode Selanjutnya" className="hover:scale-110 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="white" viewBox="0 0 24 24">
                  <path d="M4 20V4l12 8-12 8zm13-16h3v16h-3V4z" />
                </svg>
              </button>

              {/* Speed Button */}
              <button onClick={() => togglePopup('speedMenu')} title="Kecepatan" className="hover:scale-110 transition h-10 w-10">
                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF">
                  <path d="M418-340q24 24 62 23.5t56-27.5l224-336-336 224q-27 18-28.5 55t22.5 61Zm62-460q59 0 113.5 16.5T696-734l-76 48q-33-17-68.5-25.5T480-720q-133 0-226.5 93.5T160-400q0 42 11.5 83t32.5 77h552q23-38 33.5-79t10.5-85q0-36-8.5-70T766-540l48-76q30 47 47.5 100T880-406q1 57-13 109t-41 99q-11 18-30 28t-40 10H204q-21 0-40-10t-30-28q-26-45-40-95.5T80-400q0-83 31.5-155.5t86-127Q252-737 325-768.5T480-800Zm7 313Z" />
                </svg>
              </button>

              {/* Translation Button */}
              <button onClick={() => togglePopup('terjemahan')} title="Terjemahan" className="hover:scale-110 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
              </button>

              {/* Fullscreen Button */}
              <button onClick={() => { toggleFullScreen(); togglePopup('fullscreenPopup'); }} title="Fullscreen" className="hover:scale-110 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 3H5a2 2 0 00-2 2v3m0 8v3a2 2 0 002 2h3m8-18h3a2 2 0 012 2v3m0 8v3a2 2 0 01-2 2h-3" />
                </svg>
              </button>

              {/* Popup Elements */}
              
              {/* Next Episode Popup */}
              {activePopup === 'nextEpisode' && (
                <div className="absolute bottom-12 right-12 bg-[#2A2C2E] text-white rounded-md text-sm shadow-lg w-[440px] h-[160px] z-50 overflow-hidden">
                  <div className="bg-[#3A3B3D] px-4 py-2 font-semibold text-gray-200 border-b border-[#4A4B4D]">
                    Episode Selanjutnya
                  </div>
                  <div className="flex items-center p-3 gap-3 mt-4">
                    <img src={asset('img/Poster/3.png')} alt="thumbnail" className="w-[128px] h-[72px] object-cover rounded-md" />
                    <div>
                      <div className="text-white font-bold">Episode 2: Biscuits</div>
                      <p className="text-white text-sm mt-1 leading-tight">
                        It's Ted's first day of coaching, and fans aren't happy. He makes little headway but remains undeterred as the team...
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Speed Menu Popup */}
              {activePopup === 'speedMenu' && (
                <div className="absolute bottom-10 right-0 bg-[#2A2C2E] rounded-md text-sm shadow-lg w-44 z-50">
                  <div className="px-4 py-2 text-white border-b border-gray-600 font-semibold">
                    Kecepatan
                  </div>
                  <ul>
                    <li onClick={() => setSpeed(0.5)} className="hover:bg-gray-700 px-4 py-2 cursor-pointer">0.5x</li>
                    <li onClick={() => setSpeed(0.75)} className="hover:bg-gray-700 px-4 py-2 cursor-pointer">0.75x</li>
                    <li onClick={() => setSpeed(1)} className="hover:bg-gray-700 px-4 py-2 cursor-pointer font-semibold">1x (Normal)</li>
                    <li onClick={() => setSpeed(1.25)} className="hover:bg-gray-700 px-4 py-2 cursor-pointer">1.25x</li>
                    <li onClick={() => setSpeed(1.5)} className="hover:bg-gray-700 px-4 py-2 cursor-pointer">1.5x</li>
                  </ul>
                </div>
              )}

              {/* Translation Popup */}
              {activePopup === 'terjemahan' && (
                <div className="absolute bottom-full mb-4 right-6 bg-[#1B1E20] text-white rounded-md shadow-xl px-4 py-3 w-[320px] flex justify-between text-sm font-medium z-50">
                  <div className="space-y-2 w-1/2">
                    <div className="text-white font-semibold">Audio</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">✓</span><span>Bahasa Inggris</span>
                    </div>
                  </div>
                  <div className="space-y-2 w-1/2">
                    <div className="text-white font-semibold">Terjemahan</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">✓</span><span>Bahasa Indonesia</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <span className="text-xl">✓</span><span>Bahasa Inggris</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Fullscreen Popup */}
              {activePopup === 'fullscreenPopup' && (
                <div className="absolute top-[-60px] right-[20px] bg-white text-black px-4 py-2 rounded shadow">
                  Mode Fullscreen
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hidden video element for actual video playback */}
      <video ref={videoRef} className="hidden" />
    </div>
  );
}
