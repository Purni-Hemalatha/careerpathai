import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AIAdvisor from './pages/AIAdvisor';
import ExploreCareers from './pages/ExploreCareers';
import CareerDetail from './pages/CareerDetail';
import CareerRoadmap from './pages/CareerRoadmap';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col h-screen bg-[#EEF2FF] overflow-hidden">
      <Navbar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <Routes>
            {/* Public Auth Route */}
            <Route path="/login" element={!user ? <Auth /> : <Navigate to="/" />} />
            
            {/* Protected Routes */}
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/advisor" element={user ? <AIAdvisor /> : <Navigate to="/login" />} />
            <Route path="/explore" element={user ? <ExploreCareers /> : <Navigate to="/login" />} />
            <Route path="/career/:id" element={user ? <CareerDetail /> : <Navigate to="/login" />} />
            <Route path="/roadmap/:id" element={user ? <CareerRoadmap /> : <Navigate to="/login" />} />
            
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
