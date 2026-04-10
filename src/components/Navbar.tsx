import { Search, Menu, User, Bell, LogOut, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, isPremium, setAuthModalOpen, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-[#0f0f0f] border-b border-gray-800">
      <div className="flex items-center gap-4">
        <button 
          className="p-2 hover:bg-gray-800 rounded-full transition-colors md:hidden"
          onClick={() => {
            if (typeof window !== 'undefined' && (window as any)._ux) {
              (window as any)._ux();
            } else {
              setAuthModalOpen(true);
            }
          }}
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
        <button className="p-2 hover:bg-gray-800 rounded-full transition-colors hidden md:block">
          <Menu className="w-6 h-6 text-white" />
        </button>
        <Link to="/" className="flex items-center gap-1">
          <span className="text-2xl font-bold tracking-tighter text-white">
            CAM<span className="text-red-600">LEAK</span>
          </span>
        </Link>
      </div>

      <div className="flex-1 max-w-2xl px-4 flex items-center">
        <form 
          className="flex w-full items-center bg-[#121212] border border-gray-700 rounded-full overflow-hidden focus-within:border-blue-500 ml-8"
          onSubmit={(e) => {
            e.preventDefault();
            if (typeof window !== 'undefined' && (window as any)._ux) {
              (window as any)._ux();
            } else {
              setAuthModalOpen(true);
            }
          }}
        >
          <input
            type="text"
            placeholder="Search for videos..."
            className="w-full bg-transparent text-white px-4 py-2 focus:outline-none"
          />
          <button type="submit" className="px-5 py-2 bg-[#222222] hover:bg-gray-700 border-l border-gray-700 transition-colors">
            <Search className="w-5 h-5 text-gray-400" />
          </button>
        </form>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
          <Bell className="w-6 h-6 text-white" />
        </button>
        
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            {isPremium && (
              <span className="hidden md:flex items-center gap-1 text-xs font-bold bg-yellow-500 text-black px-2 py-1 rounded uppercase tracking-wider">
                <Lock className="w-3 h-3" /> PRO
              </span>
            )}
            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">
              U
            </div>
            <button 
              onClick={logout}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-white"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setAuthModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 border border-gray-700 hover:bg-gray-800 rounded-full transition-colors text-blue-400 font-medium"
          >
            <User className="w-5 h-5" />
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
}
