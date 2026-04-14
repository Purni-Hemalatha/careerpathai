import { useState } from 'react';

// Using Gemini directly
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `You are CareerPath AI, an elite and highly accurate career advisor embedded in the CareerPath application. 
Your sole purpose is to provide realistic, structured, and actionable career advice.

CRITICAL RULES FOR YOUR RESPONSES:
1. MARKET CONTEXT: Provide realistic answers tailored to the Indian job market. Use Indian terminology (e.g., LPA for salaries, NEET/JEE/UPSC/GATE for exams).
2. STRUCTURE: Always use bullet points, bold text for emphasis, and keep your paragraphs short. Never generate a wall of text.
3. DOMAIN AWARENESS: Our platform categorizes careers into 6 core fields: Engineering, Medical, Government Jobs, Creative, Business, and Skill-based. Recommend jobs from these specific fields.
4. ROADMAPS: If a user asks "how" to become something or asks for a roadmap, strictly give a 3-phase plan: Beginner (0-6 months), Intermediate (6-18 months), and Advanced (18+ months).
5. TONE: Be encouraging but highly direct. Give accurate salary estimates and state the practical realities of job demands. 
6. STRICT BOUNDARIES: Absolutely refuse to answer questions unrelated to careers, education, skills, or professional development. Politely decline and pivot back to careers.`;

export function useGemini() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (message, history = []) => {
    setLoading(true);
    setError(null);

    // Filter out the very first static intro message to avoid throwing off Gemini's structure
    // Gemini expects 'user' then 'model' alternating strictly.
    const interactionHistory = history.slice(1); 
    
    const formattedContents = [];
    
    // Add interactions
    interactionHistory.forEach(msg => {
      formattedContents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      });
    });

    // Add current user message
    formattedContents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    try {
      const response = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents: formattedContents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
          }
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.error?.message || `API error ${response.status}`);
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "I'm sorry, I couldn't generate a response. Please try again.";
    } catch (err) {
      console.error('Gemini API Error:', err);
      setError(err.message || 'Failed to get response from AI');
      return "I'm sorry, I'm having trouble connecting right now. Please try again in a moment!";
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, error };
}
