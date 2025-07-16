// Backend API to stream data from public APIs to producer-service
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(express.json());
// Allow CORS from any origin for dev/demo; restrict as needed for prod
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
// Proxy endpoint to fetch consumed messages from consumer-service
app.get('/api/consumed', async (req, res) => {
  try {
    // Use service name for Docker/K8s, localhost for local dev
    const consumerUrl = process.env.CONSUMER_SERVICE_URL || 'http://consumer:3002/api/consumed';
    const response = await axios.get(consumerUrl);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const streamingIntervals = {};

// Root GET route for health/status
app.get('/', (req, res) => {
  res.send('Data Stream Backend is running.');
});

// GET routes for stream endpoints (for browser testing)
app.get('/api/stream/:type', (req, res) => {
  res.send(`Use POST /api/stream/${req.params.type} to stream data.`);
});

// Helper to start streaming
function startStreaming(key, fetchFn, intervalMs = 10000) {
  if (streamingIntervals[key]) clearInterval(streamingIntervals[key]);
  streamingIntervals[key] = setInterval(fetchFn, intervalMs);
}
function stopStreaming(key) {
  if (streamingIntervals[key]) clearInterval(streamingIntervals[key]);
  streamingIntervals[key] = null;
}

// Producer URL: use env or default to localhost for local dev
const PRODUCER_URL = process.env.PRODUCER_URL || 'http://producer:3001/produce';

// Stream crypto price (with symbol param)
app.post('/api/stream/crypto', async (req, res) => {
  const symbol = (req.body && req.body.symbol) || 'bitcoin';
  const interval = (req.body && req.body.interval) || 10000;
  const key = `crypto-${symbol}`;
  const fetchFn = async () => {
    try {
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`;
      const resApi = await axios.get(url);
      const data = { symbol, price: resApi.data[symbol]?.usd, timestamp: Date.now() };
      await axios.post(PRODUCER_URL, data);
    } catch (err) { /* ignore for interval */ }
  };
  if (req.body && req.body.action === 'start') {
    startStreaming(key, fetchFn, interval);
    res.json({ status: 'streaming started', symbol });
  } else if (req.body && req.body.action === 'stop') {
    stopStreaming(key);
    res.json({ status: 'streaming stopped', symbol });
  } else {
    await fetchFn();
    res.json({ status: 'sent once', symbol });
  }
});

// Stream weather (with city param)
app.post('/api/stream/weather', async (req, res) => {
  const lat = req.body?.lat || 35;
  const lon = req.body?.lon || 139;
  const interval = req.body?.interval || 10000;
  const key = `weather-${lat}-${lon}`;
  const fetchFn = async () => {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
      const resApi = await axios.get(url);
      const data = { weather: resApi.data.current_weather, lat, lon, timestamp: Date.now() };
      await axios.post(PRODUCER_URL, data);
    } catch (err) { /* ignore for interval */ }
  };
  if (req.body && req.body.action === 'start') {
    startStreaming(key, fetchFn, interval);
    res.json({ status: 'streaming started', lat, lon });
  } else if (req.body && req.body.action === 'stop') {
    stopStreaming(key);
    res.json({ status: 'streaming stopped', lat, lon });
  } else {
    await fetchFn();
    res.json({ status: 'sent once', lat, lon });
  }
});

// Stream news headlines (Event Registry, demo)
app.post('/api/stream/news', async (req, res) => {
  try {
    const apiKey = '7d3fc960e34e4516baa7a9d655b4c645';
    const resApi = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
    const data = { headlines: resApi.data.articles?.map(a => a.title), timestamp: Date.now() };
    await axios.post(PRODUCER_URL, data);
    res.json({ status: 'sent', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Stream air quality (OpenAQ)
app.post('/api/stream/air', async (req, res) => {
  try {
    const resApi = await axios.get('https://api.openaq.org/v2/latest?city=Los%20Angeles');
    const data = { air: resApi.data.results, timestamp: Date.now() };
    await axios.post(PRODUCER_URL, data);
    res.json({ status: 'sent', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => console.log(`Data stream backend running on port ${PORT}`));
