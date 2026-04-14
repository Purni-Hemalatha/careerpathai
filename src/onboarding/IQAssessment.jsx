import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IQ_QUESTIONS = [
  {
    question: "If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely Lazzies?",
    options: ["True", "False"],
    correct: 0,
  },
  {
    question: "What comes next in the sequence: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "48"],
    correct: 1,
  },
  {
    question: "A doctor has a brother but the brother has no brothers. What's the relationship?",
    options: ["The doctor is a woman", "They are twins", "The doctor is adopted", "There is no relation"],
    correct: 0,
  },
  {
    question: "Which number should replace the '?' — 3, 9, 27, 81, ?",
    options: ["162", "216", "243", "324"],
    correct: 2,
  },
  {
    question: "If you have 3 apples and take away 2, how many apples do YOU have?",
    options: ["1", "2", "3", "0"],
    correct: 1,
  },
];

const TOTAL_TIME = 180; // 3 min per question session total

function formatTime(secs) {
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function IQAssessment({ personalityAnswers, onComplete }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleFinish([...answers]);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const handleFinish = (finalAnswers) => {
    clearInterval(timerRef.current);
    const score = finalAnswers.filter((a, i) => a === IQ_QUESTIONS[i].correct).length;
    onComplete({ personalityAnswers, iqAnswers: finalAnswers, iqScore: score, total: IQ_QUESTIONS.length });
  };

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    const isLast = step === IQ_QUESTIONS.length - 1;
    if (isLast) {
      handleFinish(newAnswers);
    } else {
      setDirection(1);
      setAnswers(newAnswers);
      setStep(step + 1);
      setSelected(null);
    }
  };

  const progress = ((step + 1) / IQ_QUESTIONS.length) * 100;
  const isLast = step === IQ_QUESTIONS.length - 1;
  const timerRed = timeLeft < 30;
  const q = IQ_QUESTIONS[step];
  const optionLabels = ["A", "B", "C", "D"];

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
          IQ Assessment
        </h1>
        <p style={{ color: "#6b7280", fontSize: "0.95rem", margin: 0 }}>
          Test your logical reasoning abilities
        </p>
      </motion.div>

      {/* Progress + Timer */}
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
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", alignItems: "center" }}>
          <span style={{ fontSize: "0.85rem", color: "#374151", fontWeight: 500 }}>
            Question {step + 1} of {IQ_QUESTIONS.length}
          </span>
          <div style={{
            display: "flex", alignItems: "center", gap: "5px",
            color: timerRed ? "#ef4444" : "#6c47ff",
            fontWeight: 600, fontSize: "0.85rem",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 7V12L15 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <motion.span
              key={timeLeft}
              animate={timerRed ? { scale: [1, 1.15, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {formatTime(timeLeft)}
            </motion.span>
          </div>
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
            {/* Badge */}
            <div style={{ marginBottom: "1.1rem" }}>
              <span style={{
                background: "rgba(108,71,255,0.1)",
                color: "#6c47ff",
                fontSize: "0.78rem",
                fontWeight: 600,
                padding: "4px 14px",
                borderRadius: "99px",
              }}>
                Question {step + 1}
              </span>
            </div>

            <p style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "#1f2937",
              margin: "0 0 1.5rem",
              lineHeight: 1.55,
            }}>
              {q.question}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {q.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelected(i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "0.95rem 1.2rem",
                    borderRadius: "14px",
                    border: selected === i ? "2px solid #6c47ff" : "1.5px solid #e5e7eb",
                    background: selected === i
                      ? "linear-gradient(135deg, rgba(108,71,255,0.06), rgba(168,85,247,0.06))"
                      : "#fff",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div style={{
                    width: "32px", height: "32px",
                    borderRadius: "50%",
                    border: selected === i ? "2px solid #6c47ff" : "1.5px solid #d1d5db",
                    background: selected === i ? "#6c47ff" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: selected === i ? "#fff" : "#6b7280",
                    transition: "all 0.2s ease",
                  }}>
                    {optionLabels[i]}
                  </div>
                  <span style={{
                    fontSize: "0.97rem",
                    fontWeight: selected === i ? 600 : 500,
                    color: selected === i ? "#6c47ff" : "#374151",
                    transition: "color 0.2s",
                  }}>
                    {opt}
                  </span>
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
        {isLast ? "View My Results" : "Next Question"}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.button>
    </div>
  );
}
