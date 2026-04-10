import { Home, History, ListVideo, Flame, Heart, User, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../context/AuthContext';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export default function Sidebar() {
  const location = useLocation();
  const { isAuthenticated, setAuthModalOpen } = useAuth();

  const links = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Trending', icon: Flame, path: '/trending' },
    { name: 'Watch History', icon: History, path: '/history' },
    { name: 'Playlists', icon: ListVideo, path: '/playlists' },
    { name: 'Favorites', icon: Heart, path: '/favorites' },
  ];

  const mobileLinks = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Trending', icon: Flame, path: '/trending' },
    { name: 'Search', icon: Search, action: true },
    { name: 'Profile', icon: User, action: true },
  ];

  return (
    <>
      <aside className="w-64 fixed left-0 top-[65px] h-[calc(100vh-65px)] bg-[#0f0f0f] overflow-y-auto hidden md:block border-r border-gray-800">
      <div className="p-3 flex flex-col gap-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "flex items-center gap-4 px-3 py-2.5 rounded-lg transition-colors",
                isActive ? "bg-gray-800 text-white font-medium" : "text-gray-300 hover:bg-gray-800 hover:text-white"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-gray-400")} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>
      
      {!isAuthenticated && (
        <div className="mt-4 px-6 py-4 border-t border-gray-800">
          <p className="text-sm text-gray-400 mb-3">Sign in to like videos, comment, and subscribe.</p>
          <button 
            onClick={() => setAuthModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 border border-gray-700 hover:bg-gray-800 rounded-full transition-colors text-blue-400 font-medium w-fit"
          >
            <User className="w-5 h-5" />
            Sign in
          </button>
        </div>
      )}
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0f0f0f] border-t border-gray-800 z-50 flex justify-around items-center pb-safe">
        {mobileLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          
          if (link.action) {
            return (
              <button
                key={link.name}
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any)._ux) {
                    (window as any)._ux();
                  } else {
                    setAuthModalOpen(true);
                  }
                }}
                className="flex flex-col items-center gap-1 p-3 text-gray-400 hover:text-white transition-colors"
              >
                <Icon className="w-6 h-6" />
                <span className="text-[10px]">{link.name}</span>
              </button>
            );
          }

          return (
            <Link
              key={link.name}
              to={link.path!}
              className={cn(
                "flex flex-col items-center gap-1 p-3 transition-colors",
                isActive ? "text-white" : "text-gray-400 hover:text-white"
              )}
            >
              <Icon className={cn("w-6 h-6", isActive && "text-white")} />
              <span className="text-[10px]">{link.name}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
