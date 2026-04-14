import React from 'react';
import { ChevronLeft, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { getCareerById } from '../data/careers';

const CareerDetail = () => {
  const { id } = useParams();
  const career = getCareerById(id || 'software-engineer');

  return (
    <div className="space-y-5 pb-6 animate-fade-in mt-2">

      {/* Back link */}
      <Link
        to="/explore"
        className="inline-flex items-center gap-1.5 text-slate-400 hover:text-[#7C3AED] transition-all font-semibold text-sm group"
      >
        <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
        Back to Careers
      </Link>

      {/* Hero card */}
      <motion.div
        className="glass-card shadow-md p-5 border border-slate-100"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex gap-4 items-start">
          <div className="p-4 bg-gradient-to-br from-[#7C3AED] to-[#3B82F6] text-white rounded-2xl shadow-lg shadow-purple-100 shrink-0">
            {career.icon && <career.icon size={32} />}
          </div>
          <div className="space-y-1.5 min-w-0 mt-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold text-slate-800">{career.title}</h1>
              {career.demand > 85 && (
                <span className="flex items-center gap-1 bg-yellow-400/10 text-yellow-600 px-2.5 py-0.5 rounded-full text-xs font-bold border border-yellow-200 uppercase tracking-wide">
                  <Star size={11} fill="currentColor" /> High Demand
                </span>
              )}
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">{career.description}</p>
          </div>
        </div>
      </motion.div>

      {/* 3 stat cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Salary Range', value: career.salary, icon: career.infoIcon, color: 'text-emerald-500', bg: 'bg-emerald-50', isProgress: false },
          { label: 'Education Cost', value: career.cost, icon: career.costIcon, color: 'text-blue-500', bg: 'bg-blue-50', isProgress: false },
          { label: 'Job Demand', value: `${career.demand}%`, icon: career.demandIcon, color: 'text-purple-500', bg: 'bg-purple-50', isProgress: true },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            className="glass-card space-y-2 p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 + 0.15 }}
          >
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg ${item.bg} ${item.color}`}>
                {item.icon && <item.icon size={14} />}
              </div>
              <span className="text-slate-400 font-bold uppercase text-[9px] tracking-widest">{item.label}</span>
            </div>
            <span className="text-xl font-bold text-slate-800 block">{item.value}</span>
            {item.isProgress && (
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mt-2">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${career.demand}%` }}
                  transition={{ duration: 1.2, delay: 0.6 }}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Skills */}
      <motion.div
        className="glass-card p-5"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-base font-bold text-slate-800 mb-4 pb-3 border-b border-slate-50">Required Skills</h2>
        <div className="flex flex-wrap gap-2">
          {career.skills.map((skill, i) => (
            <motion.span
              key={skill}
              className="px-3 py-1.5 bg-[#EEF2FF] text-[#7C3AED] font-semibold rounded-xl border border-blue-50 hover:border-[#7C3AED] active:scale-95 transition-all text-xs flex items-center gap-1.5 cursor-default shadow-sm"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.04 + 0.5 }}
            >
              <CheckCircle2 size={12} className="text-blue-400" /> {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Roadmap CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Link
          to={`/roadmap/${career.id}`}
          className="w-full btn-primary py-4 rounded-2xl flex items-center justify-center gap-2 text-base font-bold shadow-lg shadow-purple-100 hover:-translate-y-0.5 transition-transform"
        >
          View Career Roadmap <ArrowRight size={20} />
        </Link>
      </motion.div>
    </div>
  );
};

export default CareerDetail;
