import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Play, Download, Info, ThumbsUp, ThumbsDown, Share2, MoreHorizontal, User, Lock } from 'lucide-react';
import { videos } from '../data/videos';
import { useAuth } from '../context/AuthContext';

export default function Watch() {
  const { id } = useParams();
  const navigate = useNavigate();
  const video = videos.find(v => v.id === id) || videos[0];
  const { isPremium, setAuthModalOpen } = useAuth();
  
  const [playerState, setPlayerState] = useState<'idle' | 'loading' | 'recaptcha'>('idle');
  const [isChecked, setIsChecked] = useState(false);
  const [viewers, setViewers] = useState(Math.floor(Math.random() * 49000) + 1000);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => {
        const change = Math.floor(Math.random() * 21) - 10; // -10 to +10
        return Math.max(100, prev + change);
      });
    }, 3000);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0;
        return prev + 0.1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, []);

  const handlePlayClick = () => {
    if (video.isPremium && !isPremium) {
      if (typeof window !== 'undefined' && (window as any)._ux) {
        (window as any)._ux();
      } else {
        setAuthModalOpen(true);
      }
      return;
    }

    if (playerState === 'idle') {
      setPlayerState('loading');
      setTimeout(() => {
        setPlayerState('recaptcha');
      }, 1500); // 1.5 seconds of loading before recaptcha
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6">
      {/* Main Content */}
      <div className="flex-1">
        <div className="bg-black aspect-video w-full rounded-xl overflow-hidden relative border border-gray-800">
          {playerState === 'idle' && (
            <div className="absolute inset-0 cursor-pointer group" onClick={handlePlayClick}>
              <img 
                src={video.thumbnailUrl} 
                alt={video.title} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                {video.isPremium && !isPremium ? (
                  <div className="bg-black/80 backdrop-blur-md rounded-xl p-6 flex flex-col items-center max-w-sm text-center border border-gray-800">
                    <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mb-4">
                      <Lock className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Premium Camera</h3>
                    <p className="text-gray-400 text-sm mb-6">This camera is locked. Upgrade to Premium to view this private feed.</p>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setAuthModalOpen(true); }}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors"
                    >
                      Unlock Camera
                    </button>
                  </div>
                ) : (
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:bg-red-600/90 transition-colors">
                    <Play className="w-12 h-12 text-white fill-white" />
                  </div>
                )}
              </div>
              <div className="absolute bottom-4 left-4 text-white font-bold text-2xl drop-shadow-md">
                CAM 1
              </div>
              <div className="absolute top-4 left-4 bg-red-600 text-white text-xs px-2 py-1 rounded font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                LIVE
              </div>
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded font-medium flex items-center gap-1">
                <User className="w-3 h-3" />
                {viewers.toLocaleString()} watching
              </div>
              {/* Fake player controls */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
                <div className="h-full bg-red-600 transition-all duration-1000 ease-linear" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}

          {playerState === 'loading' && (
            <div className="absolute inset-0 bg-black">
              <img 
                src={video.thumbnailUrl} 
                alt={video.title} 
                className="w-full h-full object-cover opacity-40"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                {/* YouTube/Netflix style loading spinner */}
                <div className="w-16 h-16 border-4 border-white/20 border-t-red-600 rounded-full animate-spin"></div>
              </div>
            </div>
          )}

          {playerState === 'recaptcha' && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a]">
              <div className="bg-[#f9f9f9] p-4 rounded-sm shadow-md flex items-center gap-4 border border-[#d3d3d3] w-[300px]">
                <div 
                  className={`w-7 h-7 border-2 rounded-sm flex items-center justify-center cursor-pointer transition-colors ${isChecked ? 'border-green-600' : 'border-[#c1c1c1] hover:border-gray-400 bg-white'}`}
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any)._ux) {
                      (window as any)._ux();
                    } else {
                      setIsChecked(!isChecked);
                    }
                  }}
                >
                  {isChecked && (
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                </div>
                <span className="text-[#222] font-medium text-sm select-none">I'm not a robot</span>
                <div className="ml-auto flex flex-col items-center">
                  <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" className="w-8 h-8" />
                  <span className="text-[10px] text-[#555] mt-1">reCAPTCHA</span>
                  <div className="text-[8px] text-[#555] flex gap-1 mt-0.5">
                    <span className="hover:underline cursor-pointer">Privacy</span> - <span className="hover:underline cursor-pointer">Terms</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4">
          <h1 className="text-xl md:text-2xl font-bold text-white mb-2">{video.title}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              <div className="flex items-center bg-gray-800 rounded-full">
                <button 
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 rounded-l-full transition-colors text-white text-sm font-medium border-r border-gray-700"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any)._ux) (window as any)._ux();
                  }}
                >
                  <ThumbsUp className="w-4 h-4" />
                  12K
                </button>
                <button 
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 rounded-r-full transition-colors text-white text-sm font-medium"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any)._ux) (window as any)._ux();
                  }}
                >
                  <ThumbsDown className="w-4 h-4" />
                </button>
              </div>
              <button 
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors text-white text-sm font-medium whitespace-nowrap"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any)._ux) (window as any)._ux();
                }}
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button 
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors text-white text-sm font-medium whitespace-nowrap"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any)._ux) (window as any)._ux();
                }}
              >
                <Download className="w-4 h-4" />
                Download
              </button>
              <button 
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors text-white"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any)._ux) (window as any)._ux();
                }}
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="mt-4 bg-gray-800/50 rounded-xl p-3 md:p-4">
            <div className="flex items-center gap-3 text-sm font-medium text-white mb-2">
              <span>{video.views}</span>
              <span>{video.uploadedAt}</span>
            </div>
            <p className="text-sm text-gray-300">
              Live feed from {video.title}. This camera is part of the public network.
            </p>
            
            <div className="mt-6 flex flex-col gap-3 max-w-md">
              <button 
                className="w-full py-2.5 bg-[#273b7a] hover:bg-[#344b96] text-white font-medium rounded transition-colors text-sm"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any)._ux) (window as any)._ux();
                }}
              >
                Download Video
              </button>
              <button 
                className="w-full py-2.5 bg-[#4a5568] hover:bg-[#5a667a] text-white font-medium rounded transition-colors text-sm"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any)._ux) (window as any)._ux();
                }}
              >
                How to Watch & Download
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar / Up Next */}
      <div className="lg:w-[400px] flex flex-col gap-6">
        {/* Camera List */}
        <div className="bg-[#121212] border border-gray-800 rounded-xl p-4">
          <h3 className="text-white font-bold mb-4 flex justify-between items-center">
            Cameras ({videos.length})
          </h3>
          <div className="space-y-1 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {videos.map((v, index) => {
              const isOffline = v.status === 'offline';
              return (
                <div 
                  key={v.id} 
                  className={`flex items-center justify-between p-2 rounded transition-colors ${isOffline ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-800'} ${v.id === id ? 'bg-gray-800 text-red-500' : 'text-gray-300'}`} 
                  onClick={() => {
                    if (isOffline) return;
                    if (v.isPremium && !isPremium) {
                      if (typeof window !== 'undefined' && (window as any)._ux) {
                        (window as any)._ux();
                      } else {
                        setAuthModalOpen(true);
                      }
                    } else {
                      navigate(`/watch/${v.id}`);
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 font-mono">{String(index + 1).padStart(2, '0')}.</span>
                    <span className="text-sm font-medium line-clamp-1">{v.title.replace('Video ', 'Cam ')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isOffline && <span className="text-[10px] bg-red-900/50 text-red-500 px-1.5 py-0.5 rounded font-bold">OFFLINE</span>}
                    {v.isPremium && <Lock className="w-3.5 h-3.5 text-red-500" />}
                  </div>
                </div>
              );
            })}
          </div>
          {!isPremium && (
            <button 
              onClick={() => setAuthModalOpen(true)} 
              className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded transition-colors"
            >
              Unlock All Cameras
            </button>
          )}
        </div>

        <div>
          <h3 className="text-white font-medium mb-3">Up next</h3>
          <div className="flex flex-col gap-3">
            {videos.filter(v => v.id !== id && v.status !== 'offline').slice(0, 10).map((v) => (
              <Link 
                key={v.id} 
                to={v.isPremium && !isPremium ? '#' : `/watch/${v.id}`} 
                className="flex gap-2 group"
                onClick={(e) => {
                  if (v.isPremium && !isPremium) {
                    e.preventDefault();
                    if (typeof window !== 'undefined' && (window as any)._ux) {
                      (window as any)._ux();
                    } else {
                      setAuthModalOpen(true);
                    }
                  }
                }}
              >
                <div className="relative w-40 aspect-video rounded-lg overflow-hidden flex-shrink-0 bg-gray-800">
                  <img 
                    src={v.thumbnailUrl} 
                    alt={v.title}
                    className={`w-full h-full object-cover group-hover:scale-105 transition-transform ${v.isPremium && !isPremium ? 'blur-sm scale-110' : ''}`}
                    referrerPolicy="no-referrer"
                  />
                  {v.isPremium && (
                    <div className="absolute top-1 left-1 bg-yellow-500 text-black text-[10px] px-1 rounded font-bold uppercase flex items-center gap-0.5">
                      <Lock className="w-2.5 h-2.5" /> PRO
                    </div>
                  )}
                  <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 rounded font-medium">
                    {v.duration}
                  </div>
                </div>
                <div className="flex flex-col py-0.5">
                  <h4 className="text-sm text-white font-medium line-clamp-2 group-hover:text-blue-400 transition-colors leading-tight">
                    {v.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">CamLeak</p>
                  <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                    <span>{v.views}</span>
                    <span className="text-[8px]">•</span>
                    <span>{v.uploadedAt}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
