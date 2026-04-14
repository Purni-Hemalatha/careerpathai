import React, { useState, useEffect } from 'react';
import { ChevronLeft, CheckCircle2, Circle, Rocket, Flag, Globe, BookOpen, Layers, Award, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { getCareerById } from '../data/careers';

const phaseIcons = {
  'BEGINNER': BookOpen,
  'INTERMEDIATE': Globe,
  'ADVANCED': Rocket
};

const phaseColors = {
  'BEGINNER': 'bg-emerald-500',
  'INTERMEDIATE': 'bg-blue-500',
  'ADVANCED': 'bg-pink-500'
};

const CareerRoadmap = () => {
  const { id } = useParams();
  const career = getCareerById(id || 'software-engineer');

  // Load the detailed roadmap explicitly mapped for this career from data/careers.js
  const [steps, setSteps] = useState(
    career.roadmap.map((step, i) => ({
      ...step,
      id: i + 1,
      completed: i === 0, // Set first step as tentatively completed for demo
      icon: phaseIcons[step.phase] || BookOpen,
      chipColor: phaseColors[step.phase] || 'bg-emerald-500'
    }))
  );

  // If the user navigates directly without remounting, reset their progress local state
  useEffect(() => {
    setSteps(
      career.roadmap.map((step, i) => ({
        ...step,
        id: i + 1,
        completed: i === 0, 
        icon: phaseIcons[step.phase] || BookOpen,
        chipColor: phaseColors[step.phase] || 'bg-emerald-500'
      }))
    );
  }, [career.id]);

  const completedCount = steps.filter(s => s.completed).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100) || 0;

  const toggleStep = (stepId) =>
    setSteps(steps.map(s => s.id === stepId ? { ...s, completed: !s.completed } : s));

  // Extract unique phases for grouping
  const phases = [...new Set(steps.map(s => s.phase))].map(phase => ({
    name: phase,
    timeline: steps.find(s => s.phase === phase)?.timeline || 'TBD',
    color: phaseColors[phase] || 'bg-emerald-500'
  }));

  return (
    <div className="space-y-6 pb-8 animate-fade-in mt-2">

      {/* Back */}
      <Link
        to={`/career/${id || 'software-engineer'}`}
        className="inline-flex items-center gap-1.5 text-slate-400 hover:text-[#7C3AED] transition-all font-semibold text-sm group"
      >
        <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-0.5" /> Back to Career
      </Link>

      {/* Progress header */}
      <motion.div
        className="glass-card p-6 space-y-4 shadow-sm border border-slate-100"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{career.title} Roadmap</h1>
            <p className="text-slate-500 text-sm mt-1 leading-relaxed max-w-xl">
              Step-by-step guide to become a successful {career.title.toLowerCase()}. Follow this pipeline to master the domain.
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-3xl font-black text-[#7C3AED]">{progressPercent}%</span>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-0.5">{completedCount} of {steps.length} done</p>
          </div>
        </div>
        <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </div>
      </motion.div>

      {/* Roadmap Timeline Nodes */}
      <div className="space-y-6 relative">
        {/* Connection line backdrop */}
        <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-slate-100 hidden md:block" />
        
        {phases.map((phase, pIdx) => (
          <div key={phase.name} className="space-y-4 relative">
            
            {/* Phase Header */}
            <div className="flex items-center gap-3 relative z-10">
              <span className={`${phase.color} text-white px-5 py-1.5 rounded-full text-xs font-black tracking-widest shadow-md uppercase`}>
                {phase.name} Phase
              </span>
              <span className="text-slate-400 font-bold text-xs uppercase tracking-widest bg-white z-10 px-2">{phase.timeline}</span>
            </div>

            {/* Steps in this phase */}
            <div className="space-y-3 pl-0 md:pl-10">
              {steps.filter(s => s.phase === phase.name).map((step, sIdx) => (
                <motion.div
                  key={step.id}
                  className={`glass-card p-5 flex items-center justify-between gap-4 cursor-pointer hover:shadow-md transition-all duration-300 relative border ${
                    step.completed ? 'bg-emerald-50/40 border-emerald-100' : 'border-slate-100'
                  }`}
                  onClick={() => toggleStep(step.id)}
                  whileHover={{ x: 4 }}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (pIdx * 2 + sIdx) * 0.1 + 0.2 }}
                >
                  <div className="flex items-start gap-4 min-w-0">
                    <div className={`shrink-0 p-3 rounded-xl bg-white shadow-sm mt-0.5 transition-colors ${step.completed ? 'text-emerald-500 shadow-emerald-100' : 'text-slate-300'}`}>
                      <step.icon size={20} />
                    </div>
                    <div>
                      <h3 className={`text-base font-bold transition-all ${step.completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                        {step.label}
                      </h3>
                      <p className={`text-sm mt-1 leading-relaxed ${step.completed ? 'text-slate-300' : 'text-slate-500'}`}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                  <div className={`shrink-0 transition-all duration-300 ml-2 ${step.completed ? 'text-emerald-500' : 'text-slate-200 hover:text-slate-300'}`}>
                    {step.completed
                      ? <CheckCircle2 size={26} fill="currentColor" className="text-emerald-500" />
                      : <Circle size={26} strokeWidth={2.5} />}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Footer */}
      <motion.div
        className="bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] p-8 rounded-3xl text-center relative overflow-hidden shadow-xl shadow-purple-200 mt-10"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="relative z-10 space-y-4">
          <h2 className="text-2xl font-black text-white flex items-center justify-center gap-3">
            Keep Pushing Forward! <Rocket className="animate-bounce" size={24} />
          </h2>
          <p className="text-white/80 text-sm font-medium px-4">Consistent steps lead to massive results. Need help navigating your {career.title} journey?</p>
          <Link
            to="/advisor"
            className="bg-white text-[#7C3AED] px-8 py-3.5 rounded-xl font-bold inline-flex items-center gap-2 hover:scale-105 active:scale-95 transition-all text-sm shadow-lg mx-auto mt-2"
          >
            Talk to AI Advisor <Sparkles size={16} />
          </Link>
        </div>
        <div className="absolute top-4 right-4 opacity-10"><Sparkles size={80} className="text-white" /></div>
        <div className="absolute -bottom-8 -left-8 opacity-10"><Award size={140} className="text-white rotate-12" /></div>
      </motion.div>
    </div>
  );
};

export default CareerRoadmap;
