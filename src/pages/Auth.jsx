import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const { login, register, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;
    
    let result;
    if (isLogin) {
      result = await login(username, password);
    } else {
      result = await register(username, email, password);
    }

    if (result.success) {
      navigate('/onboarding');
      // Force reload to update navbar global state gracefully without complex context bounds
      window.location.reload(); 
    }
  };

  return (
    <div className="flex items-center justify-center h-full py-10">
      <motion.div
        className="glass-card max-w-md w-full p-8 shadow-xl shadow-purple-100/50"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-slate-800">
            {isLogin ? 'Welcome Back 👋' : 'Create an Account 🚀'}
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            {isLogin 
              ? 'Enter your credentials to access your personalized career roadmap.' 
              : 'Join CareerPath to save your journey and get AI guidance.'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-xl mb-6 font-semibold border border-red-100 flex items-center gap-2">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Username</label>
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                className="w-full bg-slate-50 border border-slate-200 py-3 pl-11 pr-4 rounded-xl focus:ring-2 focus:ring-[#7C3AED] focus:outline-none transition-all text-sm font-medium"
                placeholder="johndoe123"
                value={formData.username}
                onChange={e => setFormData({...formData, username: e.target.value})}
              />
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-1.5 animate-fade-in">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  className="w-full bg-slate-50 border border-slate-200 py-3 pl-11 pr-4 rounded-xl focus:ring-2 focus:ring-[#7C3AED] focus:outline-none transition-all text-sm font-medium"
                  placeholder="hello@example.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                className="w-full bg-slate-50 border border-slate-200 py-3 pl-11 pr-4 rounded-xl focus:ring-2 focus:ring-[#7C3AED] focus:outline-none transition-all text-sm font-medium"
                placeholder="••••••••"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3.5 mt-4 rounded-xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-purple-100 hover:scale-[1.02] active:scale-95 transition-all text-base"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : isLogin ? 'Sign In' : 'Register Account'} 
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="mt-8 text-center text-sm font-medium text-slate-500">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => { setIsLogin(!isLogin); setFormData({username:'',email:'',password:''}); }}
            className="text-[#7C3AED] font-bold hover:underline underline-offset-4"
          >
            {isLogin ? 'Register now.' : 'Sign in instead.'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
