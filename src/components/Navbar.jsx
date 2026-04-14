import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Compass, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    window.location.reload();
  }

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/advisor', label: 'AI Advisor' },
    { to: '/explore', label: 'Explore Careers' },
    { to: '/profile', label: 'Profile' },
  ];

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-slate-100 px-4 md:px-8 py-3 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="bg-gradient-to-br from-[#7C3AED] to-[#3B82F6] p-1.5 rounded-lg text-white transition-transform group-hover:rotate-12">
          <Compass size={24} />
        </div>
        <span className="text-xl font-bold tracking-tight text-[#111827]">CareerPath</span>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-2">
        {user && navLinks.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => isActive ? 'nav-active' : 'nav-link'}
          >
            {label}
          </NavLink>
        ))}
        {user ? (
          <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-200">
            <span className="text-sm font-bold text-slate-700 flex items-center gap-2 bg-slate-50 px-3 pl-1.5 py-1.5 rounded-full"><img src={`https://i.pravatar.cc/150?u=${user?.username}`} alt="avatar" className="h-6 w-6 rounded-full object-cover border border-slate-200" /> {user.username}</span>
            <button onClick={handleLogout} className="text-slate-400 hover:text-red-500 transition-colors" title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        ) : null}
      </div>

      {/* Mobile hamburger */}
      <div className="flex md:hidden items-center gap-3">
        <button
          className="p-2 rounded-lg text-slate-600 hover:text-[#7C3AED] hover:bg-slate-50 transition-all"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-lg md:hidden py-2 z-40">
          {user && navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-6 py-3 font-medium transition-colors ${
                  isActive
                    ? 'text-[#7C3AED] bg-[#f2f0ff]'
                    : 'text-slate-600 hover:text-[#7C3AED] hover:bg-slate-50'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          {user && (
            <div className="bg-slate-50 border-t border-slate-100 p-4 mx-2 mt-2 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700 flex items-center gap-2"><img src={`https://i.pravatar.cc/150?u=${user?.username}`} alt="avatar" className="h-7 w-7 rounded-full object-cover border border-slate-200" /> {user.username}</span>
                <button onClick={handleLogout} className="text-red-500 text-sm font-bold flex items-center gap-1">
                  <LogOut size={14} /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
