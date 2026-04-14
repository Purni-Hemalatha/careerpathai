import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5050; // Changed port to avoid any conflicts

app.use(cors());
app.use(express.json());

const USERS_FILE = path.join(__dirname, 'data', 'users.json');
const PROFILES_FILE = path.join(__dirname, 'data', 'profiles.json');

const OPENROUTER_API_KEY = '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';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Verified working models
const MODELS = [
  'openrouter/auto',
  'google/gemini-2.0-flash-exp:free',
  'mistralai/mistral-7b-instruct:free',
];

async function ensureFiles() {
  try {
    await fs.mkdir(path.join(__dirname, 'data'), { recursive: true });
    try { await fs.access(USERS_FILE); } catch { await fs.writeFile(USERS_FILE, JSON.stringify([])); }
    try { await fs.access(PROFILES_FILE); } catch { await fs.writeFile(PROFILES_FILE, JSON.stringify({})); }
  } catch (err) {
    console.error('File setup error:', err);
  }
}

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  if (!messages?.length) return res.status(400).json({ error: 'No messages provided' });

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  let success = false;
  for (const model of MODELS) {
    try {
      console.log(`🤖 Requesting: ${model}...`);
      const response = await fetch(OPENROUTER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'CareerPath AI',
        },
        body: JSON.stringify({ model, messages, stream: true }),
      });

      if (!response.ok) {
        console.warn(`  ❌ ${model} failed`);
        continue;
      }

      console.log(`  ✅ ${model} connected!`);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
      res.end();
      success = true;
      break;
    } catch (err) {
      console.warn(`  ❌ Error with ${model}`);
    }
  }

  if (!success) {
    res.write('data: {"error": "AI service busy"}\n\n');
    res.end();
  }
});

app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  const users = JSON.parse(await fs.readFile(USERS_FILE, 'utf-8'));
  users.push({ id: Date.now(), username, email, password, created_at: new Date().toISOString() });
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
  res.status(201).json({ success: true, user: { username } });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(await fs.readFile(USERS_FILE, 'utf-8'));
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ success: false });
  res.json({ success: true, user: { username: user.username } });
});

app.get('/api/profile/:username', async (req, res) => {
  const profiles = JSON.parse(await fs.readFile(PROFILES_FILE, 'utf-8'));
  res.json({ success: true, profile: profiles[req.params.username] || {} });
});

app.post('/api/profile/:username', async (req, res) => {
  const profiles = JSON.parse(await fs.readFile(PROFILES_FILE, 'utf-8'));
  profiles[req.params.username] = req.body;
  await fs.writeFile(PROFILES_FILE, JSON.stringify(profiles, null, 2));
  res.json({ success: true });
});

app.listen(PORT, async () => {
  await ensureFiles();
  console.log(`🚀 Server on http://localhost:${PORT}`);
});
