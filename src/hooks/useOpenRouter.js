import { useState, useRef, useCallback } from "react";

const SERVER_CHAT_URL = window.location.hostname === 'localhost' 
  ? "http://localhost:5050/api/chat" 
  : "/.netlify/functions/chat";

const SYSTEM_PROMPT = `You are CareerPath AI, a concise career advisor for the Indian job market.

Your goal is to provide SHORT, SIMPLE, and ACTIONABLE advice. 

Guidelines:
- Keep responses brief (maximum 2-3 short paragraphs).
- Use simple bullet points instead of complex tables.
- Focus on the most important 3-4 steps for any career path.
- Mention entry-level salary (LPA) and top 2-3 companies/exams.
- Avoid overwhelming the user with too much information at once.
- Always remain encouraging but stay very concise.
- If the user needs more detail, they will ask.

Respond in a friendly, conversational tone but keep it quick to read.`;

export function useOpenRouter() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const historyRef = useRef([]);

  const sendMessage = useCallback(async (userText) => {
    if (!userText.trim() || loading) return;

    const userMessage = { role: "user", text: userText.trim(), id: Date.now() };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setError(null);

    const aiId = Date.now() + 1;
    setMessages((prev) => [...prev, { role: "model", text: "", id: aiId }]);

    const apiMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...historyRef.current.map((msg) => ({
        role: msg.role === "model" ? "assistant" : "user",
        content: msg.text,
      })),
      { role: "user", content: userText.trim() },
    ];

    try {
      const response = await fetch(SERVER_CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      // DETECT IF IT IS NETLIFY OR LOCAL
      const isNetlify = SERVER_CHAT_URL.includes('.netlify');
      
      if (isNetlify) {
        // Handle non-streaming response from Netlify Function
        const data = await response.json();
        const fullText = data.choices[0].message.content;
        
        setMessages((prev) =>
          prev.map((msg) => msg.id === aiId ? { ...msg, text: fullText } : msg)
        );

        historyRef.current = [
          ...historyRef.current,
          { role: "user", text: userText.trim() },
          { role: "model", text: fullText },
        ];
      } else {
        // Handle streaming response from Local Server
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullText = "";
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop();

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const jsonStr = line.replace("data: ", "").trim();
            if (jsonStr === "[DONE]") continue;
            try {
              const parsed = JSON.parse(jsonStr);
              if (parsed?.error) throw new Error(parsed.error);
              const delta = parsed?.choices?.[0]?.delta?.content || "";
              if (delta) {
                fullText += delta;
                setMessages((prev) =>
                  prev.map((msg) => msg.id === aiId ? { ...msg, text: fullText } : msg)
                );
              }
            } catch (e) {
              if (e.message && !e.message.includes("JSON")) throw e;
            }
          }
        }

        historyRef.current = [
          ...historyRef.current,
          { role: "user", text: userText.trim() },
          { role: "model", text: fullText },
        ];
      }

    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => prev.filter((msg) => msg.id !== aiId));
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
    historyRef.current = [];
  }, []);

  return { messages, loading, error, sendMessage, clearChat };
}
