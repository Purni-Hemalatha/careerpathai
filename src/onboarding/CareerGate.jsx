import { useState } from "react";
import { motion } from "framer-motion";

export default function CareerGate({ onYes, onNo }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #eef2ff 0%, #f5f0ff 50%, #fdf4ff 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif",
      padding: "2rem",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap" rel="stylesheet" />

      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ textAlign: "center", marginBottom: "2.5rem" }}
      >
        <h1 style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
          fontWeight: 800,
          background: "linear-gradient(135deg, #6c47ff, #a855f7)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          margin: "0 0 0.6rem",
          lineHeight: 1.2,
        }}>
          Let's Start Your Journey!
        </h1>
        <p style={{ color: "#6b7280", fontSize: "1.05rem", margin: 0 }}>
          We're here to help you find your perfect career path
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "2.2rem 2.5rem",
          boxShadow: "0 8px 40px rgba(108,71,255,0.10)",
          width: "100%",
          maxWidth: "540px",
          marginBottom: "1.5rem",
        }}
      >
        <p style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: "1.18rem",
          fontWeight: 700,
          color: "#1f2937",
          textAlign: "center",
          margin: "0 0 1.6rem",
        }}>
          Do you have any idea about your career path?
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          {/* YES Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onHoverStart={() => setHovered("yes")}
            onHoverEnd={() => setHovered(null)}
            onClick={onYes}
            style={{
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              border: "none",
              borderRadius: "16px",
              padding: "2rem 1rem",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.8rem",
              boxShadow: hovered === "yes" ? "0 12px 32px rgba(34,197,94,0.4)" : "0 4px 16px rgba(34,197,94,0.2)",
              transition: "box-shadow 0.2s ease",
            }}
          >
            <div style={{
              width: "64px", height: "64px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "26px",
            }}>🎯</div>
            <div>
              <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#fff", letterSpacing: "0.5px" }}>YES</div>
              <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.85)", marginTop: "2px" }}>I have an idea</div>
            </div>
          </motion.button>

          {/* NO Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onHoverStart={() => setHovered("no")}
            onHoverEnd={() => setHovered(null)}
            onClick={onNo}
            style={{
              background: "linear-gradient(135deg, #a855f7, #7c3aed)",
              border: "none",
              borderRadius: "16px",
              padding: "2rem 1rem",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.8rem",
              boxShadow: hovered === "no" ? "0 12px 32px rgba(168,85,247,0.4)" : "0 4px 16px rgba(168,85,247,0.2)",
              transition: "box-shadow 0.2s ease",
            }}
          >
            <div style={{
              width: "64px", height: "64px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "26px",
            }}>❓</div>
            <div>
              <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#fff", letterSpacing: "0.5px" }}>NO</div>
              <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.85)", marginTop: "2px" }}>I'm confused</div>
            </div>
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{
          background: "rgba(108,71,255,0.07)",
          borderRadius: "14px",
          padding: "1rem 1.5rem",
          maxWidth: "500px",
          textAlign: "center",
          color: "#6c47ff",
          fontSize: "0.9rem",
          lineHeight: 1.6,
        }}
      >
        Don't worry! Our AI will guide you through personalized assessments to discover the perfect career match for you. 🎯
      </motion.div>
    </div>
  );
}
