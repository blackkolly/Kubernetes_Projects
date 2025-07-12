const express = require('express');
const axios = require('axios');
const app = express();

const services = [
  { name: 'producer', url: 'http://producer-service:3001/health' },
  { name: 'consumer', url: 'http://consumer-service:3002/health' },
  { name: 'mongo', url: 'http://mongo:27017' },
  { name: 'kafka', url: 'http://kafka:9092' },
];

app.get('/health', (req, res) => res.send('OK'));

async function checkServices() {
  for (const svc of services) {
    try {
      await axios.get(svc.url, { timeout: 2000 });
      console.log(`${svc.name} healthy`);
    } catch (e) {
      console.error(`ALERT: ${svc.name} unhealthy!`, e.message);
      // Here you could send an email, Slack, or PagerDuty alert
    }
  }
}

setInterval(checkServices, 10000); // Check every 10s

const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`Alert service running on port ${port}`));
