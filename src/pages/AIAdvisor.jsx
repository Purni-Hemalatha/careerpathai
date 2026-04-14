import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Bot,
  User,
  Trash2,
  Sparkles,
  ChevronRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useOpenRouter } from "../hooks/useOpenRouter";

const SUGGESTIONS = [
  "How do I start a career in Software Engineering?",
  "What is the salary of an IAS officer?",
  "Best roadmap for AI/ML in India?",
  "How to prepare for UPSC CSE?",
  "Top skills for a UI/UX designer?",
  "Is Data Science a good career in India?",
];

function MessageText({ text, isUser }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1.5" />;

        if (line.trim().startsWith("### "))
          return (
            <p key={i} className={`font-semibold text-sm mt-2 mb-0.5 ${isUser ? 'text-white' : 'text-gray-900'}`}>
              {renderInline(line.trim().slice(4), isUser)}
            </p>
          );
        if (line.trim().startsWith("## "))
          return (
            <p key={i} className={`font-semibold mt-2 mb-0.5 ${isUser ? 'text-white' : 'text-gray-900'}`}>
              {renderInline(line.trim().slice(3), isUser)}
            </p>
          );
        if (line.trim().startsWith("# "))
          return (
            <p key={i} className={`font-bold mt-2 mb-0.5 ${isUser ? 'text-white' : 'text-gray-900'}`}>
              {renderInline(line.trim().slice(2), isUser)}
            </p>
          );

        const bulletMatch = line.trim().match(/^[-•*]\s(.+)/);
        if (bulletMatch)
          return (
            <div key={i} className="flex gap-2 items-start">
              <span className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 ${isUser ? 'bg-white' : 'bg-orange-500'}`} />
              <span className="leading-relaxed">{renderInline(bulletMatch[1], isUser)}</span>
            </div>
          );

        const numMatch = line.trim().match(/^(\d+)\.\s(.+)/);
        if (numMatch)
          return (
            <div key={i} className="flex gap-2 items-start">
              <span className={`flex-shrink-0 font-semibold text-sm min-w-[1.4rem] leading-relaxed ${isUser ? 'text-white' : 'text-orange-600'}`}>
                {numMatch[1]}.
              </span>
              <span className="leading-relaxed">{renderInline(numMatch[2], isUser)}</span>
            </div>
          );

        return (
          <p key={i} className="leading-relaxed">
            {renderInline(line, isUser)}
          </p>
        );
      })}
    </div>
  );
}

function renderInline(text, isUser) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className={`font-semibold ${isUser ? 'text-white' : 'text-gray-900'}`}>
        {part}
      </strong>
    ) : (
      part
    )
  );
}

export default function AIAdvisor() {
  const { messages, loading, error, sendMessage, clearChat } = useOpenRouter();
  const [input, setInput] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 160) + "px";
    }
  }, [input]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    setHasStarted(true);
    const text = input;
    setInput("");
    await sendMessage(text);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestion = (s) => {
    setHasStarted(true);
    sendMessage(s);
  };

  const handleClear = () => {
    clearChat();
    setHasStarted(false);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-100">
                <Sparkles size={18} className="text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div>
              <h1 className="text-gray-900 font-bold text-base leading-tight">
                CareerPath AI
              </h1>
              <p className="text-gray-500 text-xs">
                Your Indian Career Expert · Always Online
              </p>
            </div>
          </div>

          {messages.length > 0 && (
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 text-xs px-3 py-2 rounded-lg hover:bg-red-50 transition-all font-medium"
            >
              <Trash2 size={14} />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Chat body */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-4 pt-8 pb-4 flex flex-col">
        <AnimatePresence mode="wait">
          {!hasStarted && messages.length === 0 ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex-1 flex flex-col items-center justify-center text-center pb-12"
            >
              <div className="w-20 h-20 rounded-3xl bg-orange-50 flex items-center justify-center mb-6">
                <Bot size={40} className="text-orange-500" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                How can I help you today?
              </h2>

              <p className="text-gray-500 text-sm max-w-sm mb-10 leading-relaxed">
                Ask about exam roadmaps, career paths, or salary details in the Indian market.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                {SUGGESTIONS.map((s, i) => (
                  <motion.button
                    key={s}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleSuggestion(s)}
                    className="flex items-center justify-between gap-3 px-4 py-4 rounded-xl bg-gray-50 hover:bg-orange-50 border border-gray-100 hover:border-orange-200 text-gray-700 hover:text-orange-700 text-sm text-left transition-all duration-200 group"
                  >
                    <span className="font-medium">{s}</span>
                    <ChevronRight size={14} className="text-gray-300 group-hover:text-orange-400 flex-shrink-0" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="messages"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 space-y-6 pb-6"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "model" && (
                    <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot size={18} className="text-orange-600" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-orange-600 text-white rounded-tr-sm shadow-lg shadow-orange-100 whitespace-pre-wrap"
                        : "bg-gray-100 text-gray-800 rounded-tl-sm border border-gray-100 shadow-sm"
                    }`}
                  >
                    {msg.role === "model" ? (
                      <MessageText text={msg.text} isUser={false} />
                    ) : (
                      msg.text
                    )}
                  </div>

                  {msg.role === "user" && (
                    <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <User size={18} className="text-gray-600" />
                    </div>
                  )}
                </motion.div>
              ))}

              {loading && (
                <div className="flex gap-4 justify-start">
                  <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Bot size={18} className="text-orange-600" />
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-sm px-5 py-3.5 flex items-center gap-3">
                    <Loader2 size={16} className="text-orange-500 animate-spin" />
                    <span className="text-gray-500 font-medium">AI is thinking...</span>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex justify-center py-2">
                  <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-sm px-5 py-3 rounded-2xl">
                    <AlertCircle size={16} />
                    <span className="font-medium">{error}</span>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input bar */}
      <div className="sticky bottom-0 bg-white/90 backdrop-blur-md border-t border-gray-100 px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-3 items-end bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 focus-within:border-orange-400 focus-within:bg-white focus-within:shadow-lg focus-within:shadow-orange-50 transition-all duration-300">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question here..."
              rows={1}
              className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 text-sm resize-none outline-none leading-relaxed min-h-[24px] max-h-[160px] py-1"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="w-10 h-10 rounded-xl bg-orange-600 hover:bg-orange-500 disabled:bg-gray-200 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0 transition-all duration-200 active:scale-95 shadow-md shadow-orange-100"
            >
              {loading ? (
                <Loader2 size={18} className="text-white animate-spin" />
              ) : (
                <Send size={18} className="text-white" />
              )}
            </button>
          </div>
          <p className="text-gray-400 text-[10px] text-center mt-3 font-medium uppercase tracking-wider">
            Powered by CareerPath AI · All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
}
