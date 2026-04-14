import React, { useState } from 'react';
import { Target, DollarSign, ArrowRight, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { allMatches } from '../data/careers';

const ExploreCareers = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = (searchParams.get('q') || '').toLowerCase();
  const categoryQuery = (searchParams.get('category') || '').toLowerCase();
  const [activeFilter, setActiveFilter] = useState(null);

  let matches = allMatches;

  if (searchQuery) {
    matches = matches.filter(c =>
      c.title.toLowerCase().includes(searchQuery) ||
      c.desc.toLowerCase().includes(searchQuery) ||
      c.requiredSkills.some(s => s.toLowerCase().includes(searchQuery))
    );
  }

  if (categoryQuery) {
    matches = matches.filter(c => c.category === categoryQuery);
  }

  if (activeFilter) {
    matches = matches.filter(c => c.tags.includes(activeFilter));
  }

  const filters = ['High Salary', 'Technical', 'Creative', 'Remote Work'];

  return (
    <div className="space-y-5 pb-6 animate-fade-in">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            Career Matches <Target className="text-[#7C3AED]" size={22} />
          </h1>
          {searchQuery ? (
            <p className="text-slate-400 text-sm mt-0.5">
              Results for: <span className="text-[#7C3AED] font-semibold">"{searchQuery}"</span>
            </p>
          ) : categoryQuery ? (
            <p className="text-slate-400 text-sm mt-0.5 capitalize">
              Showing careers in {categoryQuery.replace('-', ' ')}
            </p>
          ) : (
            <p className="text-slate-400 text-sm mt-0.5">Based on your interests and skills</p>
          )}
        </div>

        {/* Filter chips */}
        <div className="hidden md:flex items-center gap-2">
          <Filter size={13} className="text-slate-400" />
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(activeFilter === filter ? null : filter)}
              className={`px-3 py-1 font-semibold rounded-full border transition-all text-xs active:scale-95 ${
                activeFilter === filter
                  ? 'bg-[#7C3AED] text-white border-[#7C3AED]'
                  : 'bg-white text-slate-500 border-slate-100 hover:border-[#7C3AED] hover:text-[#7C3AED]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile filters */}
      <div className="flex md:hidden flex-wrap gap-2">
        <Filter size={13} className="text-slate-400 self-center" />
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(activeFilter === filter ? null : filter)}
            className={`px-3 py-1 font-semibold rounded-full border transition-all text-xs active:scale-95 ${
              activeFilter === filter
                ? 'bg-[#7C3AED] text-white border-[#7C3AED]'
                : 'bg-white text-slate-500 border-slate-100 hover:border-[#7C3AED]'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Career list */}
      <div className="space-y-3">
        {matches.length === 0 ? (
          <div className="glass-card text-center py-12">
            <p className="text-slate-400 text-sm">No careers found matching your criteria.</p>
            {categoryQuery && (
              <Link to="/explore" className="text-[#7C3AED] font-semibold text-sm hover:underline mt-2 inline-block">
                View All Careers
              </Link>
            )}
          </div>
        ) : (
          matches.map((career, i) => (
            <motion.div
              key={career.title}
              className="glass-card shadow-sm hover:shadow-lg transition-all relative overflow-hidden group p-4"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="flex items-center justify-between gap-4">
                {/* Left: icon + info */}
                <div className="flex items-start gap-4 min-w-0">
                  <div className={`shrink-0 p-3 rounded-xl ${career.iconBg} transition-transform group-hover:scale-110 mt-1`}>
                    <career.icon size={24} />
                  </div>
                  <div className="min-w-0 space-y-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-slate-800">{career.title}</h3>
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full uppercase tracking-wide">
                          {career.match}% Match
                        </span>
                      </div>
                      <p className="text-slate-500 text-xs leading-relaxed max-w-xl">{career.desc}</p>
                    </div>
                    
                    {/* Required Skills Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-50">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-0.5 mr-1">Skills:</span>
                      {career.requiredSkills.map(skill => (
                        <span key={skill} className="px-2 py-0.5 bg-purple-50 text-[#7C3AED] text-[10px] font-bold rounded-md uppercase tracking-wide border border-purple-100">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: badges + actions */}
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <div className="hidden sm:flex flex-col items-end gap-1.5">
                    <span className="flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full text-xs">
                      <DollarSign size={11} />{career.salary}
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${career.demand.includes('Very High') ? 'badge-very-high' : 'badge-high'}`}>
                      {career.demand}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/career/${career.id}`} className="btn-primary px-3 py-1.5 text-xs flex items-center gap-1 shadow-sm">
                      Explore <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Match progress bar */}
              <div className="absolute bottom-0 left-0 h-1 bg-slate-100 w-full">
                <motion.div
                  className={`h-full ${career.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${career.match}%` }}
                  transition={{ duration: 1.2, delay: i * 0.05 + 0.3, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ))
        )}
      </div>

    </div>
  );
};

export default ExploreCareers;
