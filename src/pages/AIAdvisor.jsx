import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, User, MessageSquare, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGemini } from '../hooks/useGemini';

const AIAdvisor = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your AI Career Advisor 👋 I'm here to help you discover the perfect career path based on your interests, skills, and goals. Feel free to ask me anything about careers, education, or your future!",
      label: 'AI Advisor'
    }
  ]);
  const [input, setInput] = useState('');
  const { sendMessage, loading } = useGemini();
  const chatEndRef = useRef(null);

  const suggestedQuestions = [
    'Best career for low budget?',
    'Can I switch careers after 12th?',
    'High-paying careers with creativity?',
    'What skills are in demand?',
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text) => {
    const userMessage = text || input;
    if (!userMessage.trim() || loading) return;
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setInput('');
    const aiResponse = await sendMessage(userMessage, messages);
    setMessages([...newMessages, { role: 'assistant', content: aiResponse, label: 'AI Advisor' }]);
  };

  const formatMessage = (content) => {
    return content.split('\n').map((line, i) => {
      // Return empty line spacing
      if (!line.trim()) return <div key={i} className="h-2" />;

      // Handle Headers
      if (line.startsWith('### ')) return <h3 key={i} className="font-bold text-slate-800 text-sm mt-3 mb-1">{line.replace('### ', '')}</h3>;
      if (line.startsWith('## ')) return <h2 key={i} className="font-bold text-slate-800 text-base mt-4 mb-1">{line.replace('## ', '')}</h2>;
      if (line.startsWith('# ')) return <h1 key={i} className="font-bold text-slate-800 text-lg mt-4 mb-2">{line.replace('# ', '')}</h1>;

      // Handle Bullets
      let isBullet = false;
      let rawLine = line;
      if (line.trim().startsWith('* ')) {
        isBullet = true;
        rawLine = line.replace(/^\s*\*\s/, '');
      } else if (line.trim().startsWith('- ')) {
        isBullet = true;
        rawLine = line.replace(/^\s*-\s/, '');
      }

      // Handle Bold formatting via Regex matching
      const parts = rawLine.split(/(\*\*.*?\*\*)/g);
      const formattedParts = parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j} className="font-bold text-slate-800">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      return (
        <div key={i} className={isBullet ? 'flex gap-2.5 my-1 ml-1.5' : 'my-1.5'}>
          {isBullet && <span className="text-[#7C3AED] font-bold mt-0.5 text-lg leading-none">•</span>}
          <span className="leading-relaxed">{formattedParts}</span>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col gap-4 h-full animate-fade-in">

      {/* Compact Header */}
      <div className="flex items-center gap-3">
        <motion.div
          className="w-10 h-10 bg-gradient-to-br from-[#7C3AED] to-[#3B82F6] rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-100 shrink-0"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <Sparkles size={20} />
        </motion.div>
        <div>
          <h1 className="text-xl font-bold text-slate-800 leading-none">AI Career Advisor</h1>
          <p className="text-slate-400 text-xs mt-0.5">Powered by Google Gemini 2.5</p>
        </div>
      </div>

      {/* Chat Box — fills remaining height */}
      <div className="flex-1 glass-card p-0 flex flex-col shadow-lg overflow-hidden" style={{ minHeight: 0 }}>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ minHeight: 0 }}>
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                initial={{ opacity: 0, x: msg.role === 'user' ? 16 : -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${msg.role === 'assistant' ? 'bg-purple-100' : 'bg-[#7C3AED]'}`}>
                  {msg.role === 'assistant'
                    ? <Sparkles className="text-[#7C3AED]" size={14} />
                    : <User className="text-white" size={14} />}
                </div>
                <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[80%]`}>
                  {msg.label && (
                    <span className="text-[9px] font-bold text-[#7C3AED] px-1 uppercase tracking-widest mb-0.5">
                      {msg.label}
                    </span>
                  )}
                  <div className={`p-4 rounded-2xl text-sm ${
                    msg.role === 'assistant'
                      ? 'bg-slate-50/80 text-slate-600 rounded-tl-none border border-slate-100/50'
                      : 'bg-[#7C3AED] text-white shadow-md shadow-purple-100 rounded-tr-none'
                  }`}>
                    {msg.role === 'assistant' ? formatMessage(msg.content) : msg.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading dots */}
          {loading && (
            <div className="flex gap-2.5">
              <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                <Sparkles className="text-[#7C3AED] animate-pulse" size={14} />
              </div>
              <div className="bg-slate-50 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-[#7C3AED]/40 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-[#7C3AED]/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-[#7C3AED]/40 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input area */}
        <div className="p-3 bg-slate-50/60 border-t border-slate-100 space-y-2.5">
          {/* Suggested questions */}
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[10px] font-bold text-slate-400 w-full">Suggested:</span>
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                className="bg-white hover:bg-purple-50 text-[#3B82F6] border border-slate-100 px-3 py-1 rounded-lg text-xs font-medium transition-all hover:border-[#7C3AED] active:scale-95 shadow-sm"
                onClick={() => handleSend(q)}
                disabled={loading}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Text input */}
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Ask about your career..."
              className="w-full bg-white border-0 py-2.5 pl-4 pr-12 rounded-xl ring-1 ring-slate-200 focus:ring-2 focus:ring-[#7C3AED] focus:outline-none shadow-sm transition-all text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              className="absolute right-1.5 p-2 bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white rounded-lg shadow-md active:scale-90 transition-transform disabled:opacity-50"
              onClick={() => handleSend()}
              disabled={loading}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Feature Cards — compact row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Sparkles, bg: 'bg-blue-50', color: 'text-blue-500', title: 'Personalized', desc: 'Advice tailored to you' },
          { icon: MessageSquare, bg: 'bg-purple-50', color: 'text-[#7C3AED]', title: '24/7 Available', desc: 'Ask anytime, anywhere' },
          { icon: Globe, bg: 'bg-emerald-50', color: 'text-emerald-500', title: 'Free to Use', desc: 'No hidden costs' },
        ].map(({ icon: Icon, bg, color, title, desc }) => (
          <div key={title} className="glass-card hover:shadow-md transition-all p-4">
            <div className={`p-2 ${bg} ${color} w-fit rounded-lg mb-2`}>
              <Icon size={18} />
            </div>
            <h3 className="text-sm font-bold text-slate-800">{title}</h3>
            <p className="text-slate-400 text-xs mt-0.5">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIAdvisor;
