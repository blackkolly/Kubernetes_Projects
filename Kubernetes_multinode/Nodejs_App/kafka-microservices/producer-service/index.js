const express = require("express");
const { Kafka } = require("kafkajs");
const app = express();
app.use(express.json());

const kafka = new Kafka({
  brokers: [process.env.KAFKA_BROKER || "kafka:9092"],
});
const producer = kafka.producer();

app.post("/produce", async (req, res) => {
  const { topic, message } = req.body;
  await producer.connect();
  await producer.send({ topic, messages: [{ value: message }] });
  await producer.disconnect();
  res.json({ status: "Message sent", topic, message });
});

app.get("/health", (req, res) => res.send("OK"));

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Producer running on port ${port}`));
