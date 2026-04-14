import { motion } from "framer-motion";

const PERSONALITY_PROFILES = {
  "Creative & Innovative": { type: "The Innovator", emoji: "🎨", color: "#f59e0b", careers: ["UX Designer", "Product Manager", "Architect", "Content Creator"] },
  "Logical & Analytical": { type: "The Analyst", emoji: "🧠", color: "#6c47ff", careers: ["Data Scientist", "Software Engineer", "Financial Analyst", "Research Scientist"] },
  "Collaborative & Team-based": { type: "The Collaborator", emoji: "👥", color: "#10b981", careers: ["HR Manager", "Project Manager", "Teacher", "Business Analyst"] },
  "Independent & Self-directed": { type: "The Pioneer", emoji: "🎯", color: "#ef4444", careers: ["Entrepreneur", "Consultant", "Researcher", "Freelance Developer"] },
  "Creating new things": { type: "The Creator", emoji: "✨", color: "#f59e0b", careers: ["Designer", "Startup Founder", "Game Developer", "Film Director"] },
  "Analyzing data": { type: "The Analyst", emoji: "📊", color: "#6c47ff", careers: ["Data Analyst", "Economist", "Statistician", "BI Developer"] },
  "Helping others": { type: "The Helper", emoji: "❤️", color: "#ec4899", careers: ["Doctor", "Psychologist", "Social Worker", "NGO Professional"] },
  "Leading teams": { type: "The Leader", emoji: "👑", color: "#f97316", careers: ["Manager", "Entrepreneur", "CEO", "Army Officer"] },
};

function getIQBand(score, total) {
  const pct = (score / total) * 100;
  if (pct >= 80) return { label: "Exceptional", color: "#6c47ff", desc: "Top-tier logical reasoning" };
  if (pct >= 60) return { label: "Above Average", color: "#10b981", desc: "Strong analytical ability" };
  if (pct >= 40) return { label: "Average", color: "#f59e0b", desc: "Solid reasoning foundation" };
  return { label: "Developing", color: "#ef4444", desc: "Practice will sharpen skills" };
}

export default function AssessmentResults({ results, onGoToDashboard }) {
  const { personalityAnswers, iqScore, total } = results;
  const firstAnswer = personalityAnswers?.[0]?.answer;
  const profile = PERSONALITY_PROFILES[firstAnswer] || {
    type: "The Explorer",
    emoji: "🚀",
    color: "#6c47ff",
    careers: ["Software Developer", "Data Scientist", "Business Analyst", "Product Manager"],
  };
  const iqBand = getIQBand(iqScore, total);

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

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: "center", marginBottom: "1.5rem" }}
      >
        <div style={{ fontSize: "3.5rem", marginBottom: "0.5rem" }}>{profile.emoji}</div>
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
          Your Results Are Ready!
        </h1>
        <p style={{ color: "#6b7280", fontSize: "0.95rem", margin: 0 }}>
          Here's what we discovered about you
        </p>
      </motion.div>

      <div style={{ width: "100%", maxWidth: "580px", display: "flex", flexDirection: "column", gap: "1rem" }}>

        {/* Personality Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "1.5rem",
            boxShadow: "0 8px 32px rgba(108,71,255,0.09)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{
              width: "48px", height: "48px",
              borderRadius: "14px",
              background: `${profile.color}18`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "24px",
            }}>{profile.emoji}</div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "#9ca3af", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Personality Type
              </div>
              <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#1f2937" }}>
                {profile.type}
              </div>
            </div>
          </div>

          <div>
            <p style={{ fontSize: "0.82rem", color: "#9ca3af", fontWeight: 500, margin: "0 0 0.6rem" }}>
              RECOMMENDED CAREER PATHS
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {profile.careers.map((c, i) => (
                <span key={i} style={{
                  background: `${profile.color}12`,
                  color: profile.color,
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  padding: "5px 12px",
                  borderRadius: "99px",
                  border: `1px solid ${profile.color}30`,
                }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* IQ Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "1.5rem",
            boxShadow: "0 8px 32px rgba(108,71,255,0.09)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: "0.75rem", color: "#9ca3af", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                IQ Assessment Score
              </div>
              <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#1f2937", marginTop: "2px" }}>
                {iqScore} / {total} correct
              </div>
              <div style={{ fontSize: "0.85rem", color: iqBand.color, fontWeight: 600, marginTop: "3px" }}>
                {iqBand.label} — {iqBand.desc}
              </div>
            </div>
            <div style={{
              width: "64px", height: "64px",
              borderRadius: "50%",
              background: `${iqBand.color}15`,
              border: `3px solid ${iqBand.color}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexDirection: "column",
            }}>
              <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "1.2rem", color: iqBand.color }}>
                {iqScore}
              </span>
              <span style={{ fontSize: "0.62rem", color: iqBand.color, fontWeight: 600 }}>/{total}</span>
            </div>
          </div>

          {/* Score bar */}
          <div style={{ marginTop: "1rem", height: "8px", background: "#e5e7eb", borderRadius: "99px", overflow: "hidden" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(iqScore / total) * 100}%` }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              style={{ height: "100%", background: iqBand.color, borderRadius: "99px" }}
            />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onGoToDashboard}
          style={{
            width: "100%",
            padding: "1.1rem",
            borderRadius: "14px",
            border: "none",
            background: "linear-gradient(135deg, #6c47ff, #a855f7)",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: 700,
            fontFamily: "'DM Sans', sans-serif",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(108,71,255,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          Explore My Career Paths 🚀
        </motion.button>
      </div>
    </div>
  );
}
