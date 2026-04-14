const OPENROUTER_API_KEY = process.env.VITE_OPENROUTER_API_KEY;
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

const MODELS = [
  'openrouter/auto',
  'google/gemini-2.0-flash-exp:free',
  'mistralai/mistral-7b-instruct:free',
];

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { messages } = JSON.parse(event.body);

    if (!messages || !messages.length) {
      return { statusCode: 400, body: JSON.stringify({ error: 'No messages provided' }) };
    }

    let lastError = null;

    for (const model of MODELS) {
      try {
        const response = await fetch(OPENROUTER_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
            'HTTP-Referer': 'https://careerpathai.netlify.app',
            'X-Title': 'CareerPath AI',
          },
          body: JSON.stringify({
            model,
            messages,
            temperature: 0.7,
            max_tokens: 1024,
            stream: false,
          }),
        });

        if (!response.ok) {
          const err = await response.json().catch(() => ({}));
          console.warn(`${model} failed: ${err?.error?.message}`);
          continue;
        }

        const data = await response.json();
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(data),
        };

      } catch (err) {
        lastError = err.message;
      }
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ error: lastError || 'All AI models failed' }),
    };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
