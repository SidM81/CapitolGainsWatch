import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 3001;

// Use cors middleware
app.use(cors());

app.get('/api/proxy', async (req, res) => {
  const { targetUrl } = req.query;

  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing targetUrl query parameter' });
  }

  try {
    const response = await fetch(targetUrl);
    const data = await response.json();

    // Set CORS headers
    res.set('Access-Control-Allow-Origin', '*');

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
