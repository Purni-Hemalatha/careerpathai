import React, { useState, useEffect } from 'react';
import { Search, Code, Heart, Grid, Palette, Briefcase, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { fetchCategories, fetchFeaturedCareers } from '../api';

const iconMap = { Code, Heart, Grid, Palette, Briefcase, TrendingUp };

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [cats, feat] = await Promise.all([fetchCategories(), fetchFeaturedCareers()]);
        setCategories(cats);
        setFeatured(feat);
      } catch (err) {
        console.error('Failed to fetch home data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="space-y-8 pb-6">

      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <motion.h1
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] bg-clip-text text-transparent leading-tight"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Discover Your Perfect Career Path
        </motion.h1>
        <motion.p
          className="text-base md:text-lg text-slate-500 font-medium"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Get personalized career recommendations and clear roadmaps powered by AI
        </motion.p>
        <motion.div
          className="relative max-w-xl mx-auto"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="text-slate-400" size={18} />
          </div>
          <input
            type="text"
            placeholder="Search careers... (press Enter)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border-0 shadow-lg shadow-purple-100 bg-white ring-1 ring-slate-100 focus:ring-2 focus:ring-[#7C3AED] focus:outline-none transition-all placeholder:text-slate-400 text-sm"
          />
        </motion.div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800">Explore Categories</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {categories.map((cat, i) => {
              const Icon = iconMap[cat.icon] || Code;
              return (
                <motion.div
                  key={cat.name}
                  onClick={() => navigate(`/explore?category=${cat.name.toLowerCase().replace(' ', '-')}`)}
                  className="glass-card hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer text-center group p-4"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <div className={`${cat.color} w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                    <Icon size={20} />
                  </div>
                  <span className="font-semibold text-slate-700 block text-xs">{cat.name}</span>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* Featured Careers */}
      {featured.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">Featured Careers</h2>
            <Link to="/explore" className="text-[#7C3AED] font-semibold flex items-center gap-1 hover:gap-2 transition-all text-sm">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featured.map((career, i) => {
              const Icon = iconMap[career.icon] || Code;
              return (
                <motion.div
                  key={career.title}
                  className="glass-card flex flex-col justify-between hover:shadow-lg transition-all"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="p-2.5 bg-purple-50 text-[#7C3AED] rounded-xl">
                        <Icon size={20} />
                      </div>
                      <span className={career.demand_level?.includes('Very High') ? 'badge-very-high' : 'badge-high'}>
                        {career.demand_level}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-slate-800">{career.title}</h3>
                      <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{career.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50">
                    <span className="font-bold text-slate-700 text-sm">{career.salary}</span>
                    <Link
                      to={`/career/${career.slug}`}
                      className="p-1.5 border border-slate-100 rounded-lg text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white transition-all group"
                    >
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <motion.section
        className="bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] p-6 md:p-8 rounded-2xl relative overflow-hidden shadow-xl shadow-purple-200"
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5 md:text-left text-center">
          <div className="space-y-2 max-w-lg">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-md">
                <Sparkles className="text-white" size={18} />
              </div>
              <h2 className="text-xl font-bold text-white">Not sure where to start?</h2>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Let our AI career advisor guide you based on your interests, skills, and goals
            </p>
          </div>
          <Link
            to="/advisor"
            className="bg-white text-[#7C3AED] px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:shadow-xl hover:scale-105 active:scale-95 transition-all text-sm shrink-0"
          >
            <Sparkles size={16} /> Find Your Career Path
          </Link>
        </div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/20 rounded-full -ml-16 -mb-16 blur-3xl" />
      </motion.section>
    </div>
  );
};

export default Home;
