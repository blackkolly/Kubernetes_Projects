const express = require('express');
const { Kafka } = require('kafkajs');
const app = express();
app.use(express.json());


const kafka = new Kafka({ brokers: [process.env.KAFKA_BROKER || 'localhost:9092'] }); // Use localhost for local dev
const producer = kafka.producer();

async function startProducer() {
  await producer.connect();
  console.log('Kafka producer connected');
}
startProducer();

app.post('/produce', async (req, res) => {
  try {
    const topic = req.body.topic || 'events';
    const message = JSON.stringify(req.body);
    await producer.send({ topic, messages: [{ value: message }] });
    res.json({ status: 'Message sent', topic });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/health', (req, res) => res.send('OK'));

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Producer running on port ${port}`));
