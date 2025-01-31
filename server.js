import express from 'express';
import cors from 'cors';
import { Groq } from 'groq-sdk';

const app = express();
const port = 3000;

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['POST'],
  credentials: true
}));

app.use(express.json());

const groq = new Groq({
  apiKey: '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'
});

app.post('/api/chat', async (req, res) => {
  try {
    const { question, systemPrompt } = req.body;
    
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question }
      ],
      model: "mixtral-8x7b-32768",
      temperature: 0.7,
      max_tokens: 800,
    });

    res.json({ response: completion.choices[0]?.message?.content });
  } catch (error) {
    console.error('Groq API Error:', error);
    res.status(500).json({ error: 'Failed to process the request' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});