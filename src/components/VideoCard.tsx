import { Play, Lock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Video } from '../data/videos';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function VideoCard({ video, key }: { video: Video; key?: string | number }) {
  const { isPremium, setAuthModalOpen } = useAuth();
  const isOffline = video.status === 'offline';
  const isLocked = video.isPremium && !isPremium;
  const [showToast, setShowToast] = useState(false);

  return (
    <>
      <Link 
        to={isOffline || isLocked ? '#' : `/watch/${video.id}`} 
        className={`flex flex-col gap-2 group ${isOffline ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
        onClick={(e) => {
          if (isOffline) {
            e.preventDefault();
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
          } else if (isLocked) {
          e.preventDefault();
          if (typeof window !== 'undefined' && (window as any)._ux) {
            (window as any)._ux();
          } else {
            setAuthModalOpen(true); // Fallback if script fails
          }
        }
      }}
    >
      <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-800">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title}
          className={`w-full h-full object-cover transition-transform duration-300 ${!isOffline && 'group-hover:scale-105'} ${isOffline ? 'grayscale blur-[2px]' : ''} ${isLocked ? 'blur-md scale-110' : ''}`}
          referrerPolicy="no-referrer"
        />
        
        {!isOffline && !isLocked && (
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="bg-red-600/90 rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform">
              <Play className="w-8 h-8 text-white fill-white" />
            </div>
          </div>
        )}

        {isLocked && (
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center transition-colors group-hover:bg-black/60">
            <div className="bg-red-600/90 rounded-full p-3 mb-2">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-bold text-sm tracking-wider">PREMIUM</span>
          </div>
        )}

        {isOffline && (
          <div className="absolute inset-0 bg-red-900/40 flex flex-col items-center justify-center backdrop-blur-[1px]">
            <AlertTriangle className="w-8 h-8 text-red-500 mb-2" />
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
              Offline
            </span>
          </div>
        )}

        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-medium">
          {video.duration}
        </div>
        
        <div className="absolute top-2 left-2 flex gap-1">
          {video.isPremium && (
            <div className="bg-yellow-500 text-black text-xs px-1.5 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-1">
              <Lock className="w-3 h-3" />
              PRO
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-3 pr-6">
        <div className="flex flex-col">
          <h3 className={`font-medium line-clamp-2 transition-colors ${isOffline ? 'text-gray-500' : 'text-white group-hover:text-blue-400'}`}>
            {video.title}
          </h3>
          <div className="text-sm text-gray-400 mt-1 flex items-center gap-1">
            <span>{video.views}</span>
            <span className="text-[10px]">•</span>
            <span>{video.uploadedAt}</span>
          </div>
        </div>
      </div>
    </Link>

      {/* Offline Toast */}
      {showToast && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-red-900/90 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 border border-red-500/50 animate-in fade-in slide-in-from-bottom-4">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <p className="text-sm font-medium">Connection Error: Camera is currently unreachable.</p>
        </div>
      )}
    </>
  );
}
