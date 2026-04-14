import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUESTIONS = [
  {
    question: "How do you prefer to solve problems?",
    options: [
      { icon: "🎨", label: "Creative & Innovative" },
      { icon: "🧠", label: "Logical & Analytical" },
      { icon: "👥", label: "Collaborative & Team-based" },
      { icon: "🎯", label: "Independent & Self-directed" },
    ],
  },
  {
    question: "What energizes you the most?",
    options: [
      { icon: "✨", label: "Creating new things" },
      { icon: "📊", label: "Analyzing data" },
      { icon: "❤️", label: "Helping others" },
      { icon: "👑", label: "Leading teams" },
    ],
  },
  {
    question: "Which best describes your work style?",
    options: [
      { icon: "📋", label: "Structured & Organized" },
      { icon: "🔄", label: "Flexible & Adaptive" },
      { icon: "🔍", label: "Detail-oriented" },
      { icon: "🌟", label: "Big-picture thinker" },
    ],
  },
];

export default function PersonalityAssessment({ onComplete }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [direction, setDirection] = useState(1);

  const progress = ((step + 1) / QUESTIONS.length) * 100;
  const isLast = step === QUESTIONS.length - 1;

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, { question: QUESTIONS[step].question, answer: QUESTIONS[step].options[selected].label }];
    if (isLast) {
      onComplete(newAnswers);
    } else {
      setDirection(1);
      setAnswers(newAnswers);
      setStep(step + 1);
      setSelected(null);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #eef2ff 0%, #f5f0ff 50%, #fdf4ff 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif",
      padding: "2rem 1rem",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap" rel="stylesheet" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: "center", marginBottom: "1.8rem" }}
      >
        <h1 style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
          fontWeight: 800,
          background: "linear-gradient(135deg, #6c47ff, #a855f7)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          margin: "0 0 0.4rem",
        }}>
          Personality Assessment
        </h1>
        <p style={{ color: "#6b7280", fontSize: "0.95rem", margin: 0 }}>
          Help us understand your unique traits
        </p>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          width: "100%",
          maxWidth: "600px",
          background: "#fff",
          borderRadius: "12px",
          padding: "0.9rem 1.2rem",
          marginBottom: "1.4rem",
          boxShadow: "0 2px 12px rgba(108,71,255,0.07)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <span style={{ fontSize: "0.85rem", color: "#374151", fontWeight: 500 }}>
            Step {step + 1} of {QUESTIONS.length}
          </span>
          <span style={{ fontSize: "0.85rem", color: "#6c47ff", fontWeight: 600 }}>
            {Math.round(progress)}%
          </span>
        </div>
        <div style={{ height: "8px", background: "#e5e7eb", borderRadius: "99px", overflow: "hidden" }}>
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #6c47ff, #a855f7)",
              borderRadius: "99px",
            }}
          />
        </div>
      </motion.div>

      {/* Question Card */}
      <div style={{ width: "100%", maxWidth: "600px", marginBottom: "1.4rem" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "2rem",
              boxShadow: "0 8px 32px rgba(108,71,255,0.09)",
            }}
          >
            <p style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "1.15rem",
              fontWeight: 700,
              color: "#1f2937",
              textAlign: "center",
              margin: "0 0 1.5rem",
            }}>
              {QUESTIONS[step].question}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {QUESTIONS[step].options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelected(i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem 1.25rem",
                    borderRadius: "14px",
                    border: selected === i
                      ? "2px solid #6c47ff"
                      : "1.5px solid #e5e7eb",
                    background: selected === i
                      ? "linear-gradient(135deg, rgba(108,71,255,0.06), rgba(168,85,247,0.06))"
                      : "#fff",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span style={{ fontSize: "22px", flexShrink: 0 }}>{opt.icon}</span>
                  <span style={{
                    fontSize: "0.98rem",
                    fontWeight: selected === i ? 600 : 500,
                    color: selected === i ? "#6c47ff" : "#374151",
                    transition: "color 0.2s",
                  }}>
                    {opt.label}
                  </span>
                  {selected === i && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{
                        marginLeft: "auto",
                        width: "22px", height: "22px",
                        borderRadius: "50%",
                        background: "#6c47ff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                        <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Next Button */}
      <motion.button
        whileHover={selected !== null ? { scale: 1.02 } : {}}
        whileTap={selected !== null ? { scale: 0.98 } : {}}
        onClick={handleNext}
        disabled={selected === null}
        style={{
          width: "100%",
          maxWidth: "600px",
          padding: "1.05rem",
          borderRadius: "14px",
          border: "none",
          background: selected !== null
            ? "linear-gradient(135deg, #6c47ff, #a855f7)"
            : "#e5e7eb",
          color: selected !== null ? "#fff" : "#9ca3af",
          fontSize: "1rem",
          fontWeight: 600,
          fontFamily: "'DM Sans', sans-serif",
          cursor: selected !== null ? "pointer" : "not-allowed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          transition: "all 0.25s ease",
          boxShadow: selected !== null ? "0 8px 24px rgba(108,71,255,0.3)" : "none",
        }}
      >
        {isLast ? "Continue to IQ Test" : "Next Question"}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.button>
    </div>
  );
}
