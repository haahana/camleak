/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Watch from './pages/Watch';
import { AuthProvider } from './context/AuthContext';
import AuthModal from './components/AuthModal';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col font-sans">
          <Navbar />
          <div className="flex flex-1 pt-[1px]">
            <Sidebar />
            <main className="flex-1 md:ml-64 bg-[#0f0f0f]">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/watch/:id" element={<Watch />} />
                {/* Fallback routes for sidebar links */}
                <Route path="/trending" element={<Home />} />
                <Route path="/history" element={<Home />} />
                <Route path="/playlists" element={<Home />} />
                <Route path="/favorites" element={<Home />} />
              </Routes>
            </main>
          </div>
          <AuthModal />
        </div>
      </Router>
    </AuthProvider>
  );
}
