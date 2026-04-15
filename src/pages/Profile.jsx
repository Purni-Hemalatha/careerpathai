import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Building2, Briefcase, GraduationCap, Link as LinkIcon, Edit3, ChevronRight, Plus, Star, Award, BookOpen, Save, Loader2, X, Trash2, Cpu, Heart, ShieldAlert, Palette, Target, TrendingUp, CheckCircle2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

const API_BASE_URL = 'http://localhost:5050/api';
const isLocal = window.location.hostname === 'localhost';

const Modal = ({ title, isOpen, onClose, onSave, saving, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full text-slate-500 transition-colors"><X size={20}/></button>
        </div>
        <div className="p-5 sm:p-6 max-h-[65vh] overflow-y-auto space-y-4">
          {children}
        </div>
        <div className="p-5 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50">
          <button onClick={onClose} className="px-6 py-2.5 font-bold text-slate-600 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors">Cancel</button>
          <button onClick={onSave} disabled={saving} className="btn-primary px-8 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-sm">
            {saving ? <Loader2 size={16} className="animate-spin" /> : 'Save'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const CAREER_FIELDS = [
  { id: 'engineering', label: 'Engineering', icon: Cpu, color: 'text-blue-500', bg: 'bg-blue-50', roles: ['Software Engineer', 'AI/ML Engineer', 'DevOps Engineer', 'Data Engineer', 'Civil Engineer', 'Mechanical Engineer'] },
  { id: 'medical', label: 'Medical', icon: Heart, color: 'text-pink-500', bg: 'bg-pink-50', roles: ['Doctor (MBBS)', 'Dentist', 'Pharmacist', 'Physiotherapist', 'Nurse', 'Radiologist'] },
  { id: 'government', label: 'Government Jobs', icon: ShieldAlert, color: 'text-green-500', bg: 'bg-green-50', roles: ['IAS Officer (UPSC)', 'IPS Officer', 'Bank PO (IBPS)', 'SSC CGL Officer', 'Railway Officer'] },
  { id: 'creative', label: 'Creative', icon: Palette, color: 'text-purple-500', bg: 'bg-purple-50', roles: ['Graphic Designer', 'UI/UX Designer', 'Video Editor', 'Animator', 'Fashion Designer'] },
  { id: 'business', label: 'Business', icon: Briefcase, color: 'text-orange-500', bg: 'bg-orange-50', roles: ['Business Analyst', 'Marketing Manager', 'Entrepreneur', 'HR Manager', 'Financial Analyst'] },
  { id: 'skillbased', label: 'Skill-based', icon: TrendingUp, color: 'text-teal-500', bg: 'bg-teal-50', roles: ['Web Developer', 'Mobile App Developer', 'Digital Marketer', 'Cyber Security Analyst'] },
];

const AI_SUGGESTIONS = {
  engineering: ["Based on your profile, consider adding DSA skills — 87% of software roles require it", "You have React experience — explore Full Stack specialisation", "Add your GitHub link to increase visibility"],
  medical: ["Your NEET preparation profile is 60% complete — add your coaching institute under experience", "Consider adding BLS certification to strengthen your profile"],
  government: ["Add your optional subject to help match you with study group communities", "Students with your background have 73% success rate in prelims after 14 months"],
  creative: ["Add at least 2 Figma case studies to your portfolio — recruiters check this first", "Your profile matches 12 open internships on Internshala right now"],
  business: ["Add SQL and Power BI skills — they appear in 91% of BA job descriptions", "Consider adding an MBA entrance score to broaden opportunities"],
  skillbased: ["Host your projects on GitHub Pages or Vercel to make them live and shareable", "Add freelance projects — even 1 client project increases hire chances by 60%"]
};

const TARGET_ROLE_SKILLS = {
  'Software Engineer': ['Python', 'JavaScript', 'React', 'Node.js', 'Git', 'DSA'],
  'Doctor (MBBS)': ['Clinical Diagnosis', 'Anatomy', 'Pharmacology', 'Patient Care'],
  'IAS Officer (UPSC)': ['General Knowledge', 'Essay Writing', 'Ethics', 'Leadership'],
  'Graphic Designer': ['Photoshop', 'Illustrator', 'Typography', 'Color Theory'],
  'Business Analyst': ['Excel', 'SQL', 'Power BI', 'Communication', 'Requirement Gathering'],
  'Web Developer': ['HTML', 'CSS', 'JavaScript', 'React', 'REST APIs'],
  'Dentist': ['Oral Surgery', 'Dental Radiology', 'Patient Management'],
  'UI/UX Designer': ['Figma', 'Wireframing', 'Prototyping', 'User Research'],
  'Digital Marketer': ['SEO', 'Google Ads', 'Canva', 'Analytics', 'Copywriting'],
  'Cyber Security Analyst': ['Linux', 'Kali Linux', 'Ethical Hacking', 'Networking', 'Python']
};

const Profile = () => {
  const { user } = useAuth();
  
  const [profileData, setProfileData] = useState({
    headline: '', location: '', university: '', about: '', selectedField: '', targetRole: '',
    topSkills: [], experience: [], education: [], certifications: [], achievements: [], projects: []
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const [modals, setModals] = useState({ header: false, about: false, field: false, skills: false, experience: false });
  const [editBuffer, setEditBuffer] = useState({...profileData});
  const [skillInput, setSkillInput] = useState('');
  const [expForm, setExpForm] = useState({ role: '', company: '', duration: '', desc: '' });

  useEffect(() => {
    if (user?.username) {
      const fetchProfile = async () => {
        try {
          if (!isLocal) {
            const profiles = JSON.parse(localStorage.getItem('mock_db_profiles') || '{}');
            const profile = profiles[user.username] || {};
            setProfileData(prev => ({ ...prev, ...profile }));
          } else {
            const response = await fetch(`${API_BASE_URL}/profile/${user.username}`);
            const result = await response.json();
            if (result.success && result.profile) {
              setProfileData(prev => ({ ...prev, ...result.profile }));
            }
          }
        } catch (err) {
          console.error('Failed to fetch profile:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    }
  }, [user]);

  const openModal = (type) => { setEditBuffer({...profileData}); setModals({...modals, [type]: true}); };
  const closeModal = (type) => { setModals({...modals, [type]: false}); setExpForm({role:'', company:'', duration:'', desc:''}); };

  const handleSave = async (type) => {
    setSaving(true);
    try {
      if (!isLocal) {
        await new Promise(r => setTimeout(r, 400));
        const profiles = JSON.parse(localStorage.getItem('mock_db_profiles') || '{}');
        profiles[user.username] = editBuffer;
        localStorage.setItem('mock_db_profiles', JSON.stringify(profiles));
      } else {
        const response = await fetch(`${API_BASE_URL}/profile/${user.username}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editBuffer),
        });
        const result = await response.json();
        if (!result.success) throw new Error('Save failed');
      }

      setProfileData(editBuffer);
      closeModal(type);
      setSaveMessage('Profile saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (err) {
      console.error('Failed to save profile:', err);
      setSaveMessage('Error saving profile');
    } finally {
      setSaving(false);
    }
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim() && !editBuffer.topSkills?.includes(skillInput.trim())) {
      setEditBuffer({ ...editBuffer, topSkills: [...(editBuffer.topSkills||[]), skillInput.trim()] });
    }
    setSkillInput('');
  };

  const addExperience = (e) => {
    e.preventDefault();
    if (expForm.role && expForm.company) {
      setEditBuffer({ ...editBuffer, experience: [...(editBuffer.experience||[]), { id: Date.now(), ...expForm }] });
      setExpForm({ role: '', company: '', duration: '', desc: '' });
    }
  };

  // Completion Meter Logic
  let completionPoints = 0;
  if (profileData.headline && profileData.location) completionPoints += 15;
  if (profileData.selectedField) completionPoints += 10;
  if (profileData.targetRole) completionPoints += 10;
  if (profileData.topSkills?.length >= 3) completionPoints += 15;
  if (profileData.experience?.length >= 1) completionPoints += 15;
  if (profileData.education?.length >= 1) completionPoints += 10;
  if (profileData.certifications?.length >= 1) completionPoints += 10;
  if (profileData.projects?.length >= 1) completionPoints += 10;
  if (profileData.about) completionPoints += 5;

  if (loading) return <div className="flex h-[80vh] items-center justify-center"><Loader2 size={32} className="animate-spin text-[#7C3AED]" /></div>;

  const currentFieldMeta = CAREER_FIELDS.find(f => f.id === profileData.selectedField);

  return (
    <div className="space-y-6 pb-12 animate-fade-in relative max-w-5xl mx-auto mt-2">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {saveMessage && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed top-4 right-4 z-[200] bg-green-50 text-green-600 border border-green-200 px-6 py-3 rounded-xl shadow-lg font-bold flex items-center gap-2">
            <CheckCircle2 size={20} /> {saveMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col (Main Profile) */}
        <div className="lg:col-span-2 space-y-6">
          
          <motion.div className="glass-card overflow-hidden shadow-md border border-slate-100">
            <div className="h-40 sm:h-52 w-full bg-gradient-to-br from-[#7C3AED] to-[#3B82F6] relative"></div>
            <div className="px-6 sm:px-10 pb-8 relative">
              <div className="flex justify-between items-end -mt-16 sm:-mt-20 mb-4 bg-transparent relative z-10 w-full">
                <div className="h-32 w-32 sm:h-40 sm:w-40 bg-white rounded-full p-1.5 shadow-xl">
                  <div className="h-full w-full bg-slate-100 rounded-full flex items-center justify-center border-4 border-white shadow-inner overflow-hidden">
                    <img src={`https://i.pravatar.cc/300?u=${user?.username}`} alt="avatar" className="h-full w-full object-cover"/>
                  </div>
                </div>
                <button onClick={() => openModal('header')} className="bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 px-5 py-2 rounded-full font-bold text-sm flex items-center gap-1.5 shadow-sm">
                  <Edit3 size={14}/> Edit Intro
                </button>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <h1 className="text-3xl font-bold text-slate-800 tracking-tight capitalize">{user?.username}</h1>
                  <p className="text-slate-600 font-medium text-[17px] mt-1 pr-10">{profileData.headline || "Add professional title"}</p>
                </div>
                <div className="flex flex-wrap items-center gap-y-3 gap-x-5 text-sm font-semibold text-slate-500">
                  <span className="flex items-center gap-1.5"><Building2 size={16} className="text-slate-400" /> {profileData.university || 'Add College/School'}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={16} className="text-slate-400" /> {profileData.location || 'Add Location'}</span>
                  <span className="flex items-center gap-1.5"><Mail size={16} className="text-slate-400" /> {user?.email}</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="glass-card p-6 sm:p-8 relative">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-800">About</h2>
              <button onClick={() => openModal('about')} className="p-2 text-slate-500 hover:text-[#7C3AED] hover:bg-purple-50 rounded-full transition-colors"><Edit3 size={20} /></button>
            </div>
            <p className="text-slate-600 text-[15px] leading-relaxed whitespace-pre-wrap">{profileData.about || "Write something about yourself..."}</p>
          </motion.div>

          <motion.div className="glass-card p-6 sm:p-8 relative">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Briefcase size={22} className="text-[#3B82F6]" /> Experience</h2>
              <button onClick={() => openModal('experience')} className="p-2 text-slate-500 hover:text-[#7C3AED] hover:bg-purple-50 rounded-full transition-colors"><Plus size={22} /></button>
            </div>
            <div className="space-y-8">
              {(!profileData.experience || profileData.experience.length === 0) && <p className="text-slate-500 text-sm">No experience added yet.</p>}
              {profileData.experience?.map((exp, i) => (
                <div key={exp.id} className={`relative pl-4 ${i !== profileData.experience.length - 1 ? 'border-l-2 border-slate-100 pb-4' : ''}`}>
                  <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-slate-200 border-4 border-white shadow-sm" />
                  <h3 className="text-base font-bold text-slate-800">{exp.role}</h3>
                  <div className="text-[13px] font-bold text-slate-500 mt-1 flex items-center gap-2">
                    <span className="text-slate-700">{exp.company}</span> • <span>{exp.duration}</span>
                  </div>
                  <p className="text-slate-600 text-[14px] mt-2 leading-relaxed">{exp.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Col */}
        <div className="space-y-6">

          {/* Completion Meter */}
          <motion.div className="glass-card p-6 bg-gradient-to-br from-white to-slate-50 border-t-4 border-[#7C3AED]">
            <h2 className="text-base font-bold text-slate-800 mb-2">Profile Strength</h2>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-black text-[#7C3AED]">{completionPoints}%</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{completionPoints === 100 ? 'All-Star' : 'Intermediate'}</span>
            </div>
            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] transition-all duration-1000" style={{ width: `${completionPoints}%` }}></div>
            </div>
          </motion.div>

          {/* Career Target Box */}
          <motion.div className="glass-card p-6 border border-slate-100 shadow-sm relative overflow-hidden">
             {currentFieldMeta && <div className={`absolute top-0 right-0 p-8 ${currentFieldMeta.bg} rounded-bl-full -z-10 opacity-50`}></div>}
             <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-800">Target Role</h2>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">{profileData.selectedField ? currentFieldMeta?.label : 'No field selected'}</p>
                </div>
                <button onClick={() => openModal('field')} className="p-2 text-slate-400 hover:text-[#7C3AED] hover:bg-purple-50 rounded-full"><Edit3 size={16}/></button>
             </div>
             {profileData.targetRole ? (
               <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-md">
                 <Target size={16} className="text-[#3B82F6]" /> {profileData.targetRole}
               </div>
             ) : (
               <button onClick={() => openModal('field')} className="text-sm font-bold text-[#3B82F6] hover:underline underline-offset-4">Select Target Role</button>
             )}
          </motion.div>

          {/* Skills Box */}
          <motion.div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
               <h2 className="text-base font-bold text-slate-800">Top Skills</h2>
               <button onClick={() => openModal('skills')} className="p-2 text-slate-400 hover:text-[#7C3AED] hover:bg-purple-50 rounded-full"><Plus size={18}/></button>
            </div>
            <div className="flex flex-wrap gap-2">
               {profileData.topSkills?.map((s, i) => (
                 <span key={i} className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-700 font-semibold rounded-lg text-xs shadow-sm bg-white">{s}</span>
               ))}
               {(!profileData.topSkills || profileData.topSkills.length === 0) && <span className="text-slate-400 text-xs">No skills added.</span>}
            </div>
          </motion.div>

          {/* AI Suggestions Box */}
          {completionPoints >= 30 && profileData.selectedField && (
            <motion.div className="glass-card p-6 border border-indigo-100 bg-indigo-50/30">
              <h2 className="text-base font-bold text-indigo-900 mb-4 flex items-center gap-2">
                <Sparkles size={18} className="text-indigo-500" /> AI Suggestions
              </h2>
              <div className="space-y-3">
                {AI_SUGGESTIONS[profileData.selectedField]?.map((tip, i) => (
                   <div key={i} className="bg-white p-3 rounded-xl border border-indigo-100 text-sm font-medium text-slate-600 shadow-sm leading-snug">
                     {tip}
                   </div>
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </div>

      {/* --- ALL MODALS --- */}
      
      {/* Intro Modal */}
      <Modal title="Edit Intro" isOpen={modals.header} onClose={() => closeModal('header')} onSave={() => handleSave('header')} saving={saving}>
        <div className="space-y-4">
          <div><label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Headline</label><input type="text" value={editBuffer.headline} onChange={e => setEditBuffer({...editBuffer, headline: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-[#7C3AED]" /></div>
          <div><label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Location</label><input type="text" value={editBuffer.location} onChange={e => setEditBuffer({...editBuffer, location: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-[#7C3AED]" /></div>
          <div><label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">University / Education</label><input type="text" value={editBuffer.university} onChange={e => setEditBuffer({...editBuffer, university: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-[#7C3AED]" /></div>
        </div>
      </Modal>

      {/* About Modal */}
      <Modal title="Edit About" isOpen={modals.about} onClose={() => closeModal('about')} onSave={() => handleSave('about')} saving={saving}>
        <div><label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Summary</label><textarea rows="6" value={editBuffer.about} onChange={e => setEditBuffer({...editBuffer, about: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-[#7C3AED] resize-y" /></div>
      </Modal>

      {/* Career Target Modal */}
      <Modal title="Career Track Selection" isOpen={modals.field} onClose={() => closeModal('field')} onSave={() => handleSave('field')} saving={saving}>
        <div className="space-y-5">
           <div>
             <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Select Career Field</label>
             <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
               {CAREER_FIELDS.map(f => (
                 <button key={f.id} onClick={() => setEditBuffer({...editBuffer, selectedField: f.id, targetRole: ''})} className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${editBuffer.selectedField === f.id ? `border-[#7C3AED] bg-purple-50 ring-2 ring-purple-100` : `border-slate-200 bg-white hover:bg-slate-50`}`}>
                   <f.icon size={24} className={editBuffer.selectedField === f.id ? 'text-[#7C3AED]' : 'text-slate-400'} />
                   <span className={`text-xs font-bold ${editBuffer.selectedField === f.id ? 'text-[#7C3AED]' : 'text-slate-600'}`}>{f.label}</span>
                 </button>
               ))}
             </div>
           </div>
           
           {editBuffer.selectedField && (
             <div className="animate-fade-in pt-2">
               <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Select Target Role</label>
               <select value={editBuffer.targetRole} onChange={e => setEditBuffer({...editBuffer, targetRole: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-700 focus:outline-none focus:border-[#7C3AED]">
                 <option value="">-- Choose a Role --</option>
                 {CAREER_FIELDS.find(f => f.id === editBuffer.selectedField)?.roles.map(r => (
                   <option key={r} value={r}>{r}</option>
                 ))}
               </select>
             </div>
           )}
        </div>
      </Modal>

      {/* Skills Modal */}
      <Modal title="Manage Skills" isOpen={modals.skills} onClose={() => closeModal('skills')} onSave={() => handleSave('skills')} saving={saving}>
        <div className="space-y-4">
          <form onSubmit={addSkill} className="flex gap-2">
            <input type="text" value={skillInput} onChange={e => setSkillInput(e.target.value)} placeholder="Type a skill and press enter..." className="flex-1 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:border-[#7C3AED]" />
            <button type="submit" className="bg-[#7C3AED] px-4 rounded-xl text-white font-bold text-sm shadow-md">Add</button>
          </form>

          {editBuffer.targetRole && TARGET_ROLE_SKILLS[editBuffer.targetRole] && (
            <div className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
              <p className="text-xs font-bold text-indigo-800 mb-2">Suggested for {editBuffer.targetRole}:</p>
              <div className="flex flex-wrap gap-2">
                {TARGET_ROLE_SKILLS[editBuffer.targetRole].map((skill, i) => (
                  <button 
                    key={i} 
                    type="button"
                    onClick={() => {
                      if (!editBuffer.topSkills?.includes(skill)) {
                        setEditBuffer({ ...editBuffer, topSkills: [...(editBuffer.topSkills||[]), skill] });
                      }
                    }}
                    disabled={editBuffer.topSkills?.includes(skill)}
                    className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 font-bold rounded-lg text-xs shadow-sm hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    + {skill}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            {editBuffer.topSkills?.map((skill, i) => (
              <span key={i} className="px-3.5 py-1.5 bg-slate-100 border border-slate-200 text-slate-700 font-bold rounded-xl text-[13px] flex items-center gap-2">
                {skill} <button onClick={() => setEditBuffer({...editBuffer, topSkills: editBuffer.topSkills.filter(s=>s!==skill)})} className="text-slate-400 hover:text-red-500 bg-white rounded-full p-0.5"><X size={14}/></button>
              </span>
            ))}
          </div>
        </div>
      </Modal>

      {/* Experience Modal */}
      <Modal title="Manage Experience" isOpen={modals.experience} onClose={() => closeModal('experience')} onSave={() => handleSave('experience')} saving={saving}>
        <div className="space-y-6">
          <form className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Add Experience</h3>
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="Title (e.g. Intern)" value={expForm.role} onChange={e=>setExpForm({...expForm, role: e.target.value})} className="w-full border border-slate-200 rounded-lg p-2.5 text-sm outline-none" />
              <input type="text" placeholder="Company" value={expForm.company} onChange={e=>setExpForm({...expForm, company: e.target.value})} className="w-full border border-slate-200 rounded-lg p-2.5 text-sm outline-none" />
            </div>
            <input type="text" placeholder="Duration (e.g. Jun 2024 - Present)" value={expForm.duration} onChange={e=>setExpForm({...expForm, duration: e.target.value})} className="w-full border border-slate-200 rounded-lg p-2.5 text-sm outline-none" />
            <textarea placeholder="Description" rows="2" value={expForm.desc} onChange={e=>setExpForm({...expForm, desc: e.target.value})} className="w-full border border-slate-200 rounded-lg p-2.5 text-sm outline-none" />
            <button onClick={addExperience} className="w-full bg-slate-800 text-white font-bold py-2 rounded-lg text-sm hover:bg-black transition-colors">Add to List</button>
          </form>
          <div className="space-y-2">
            {editBuffer.experience?.map(exp => (
              <div key={exp.id} className="flex justify-between items-center p-3 border border-slate-200 rounded-xl bg-white"><div className="text-sm font-bold text-slate-800">{exp.role} <span className="text-slate-500 font-medium text-xs">at {exp.company}</span></div><button onClick={() => setEditBuffer({...editBuffer, experience: editBuffer.experience.filter(e=>e.id!==exp.id)})} className="text-red-400 hover:bg-red-50 p-2 rounded-lg"><Trash2 size={16}/></button></div>
            ))}
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default Profile;
