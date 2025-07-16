const express = require("express");
const { Kafka } = require("kafkajs");
const { MongoClient } = require("mongodb");
const app = express();

const kafka = new Kafka({
  brokers: [process.env.KAFKA_BROKER || "kafka:9092"],
});
const consumer = kafka.consumer({ groupId: "consumer-group" });
const mongoUrl = process.env.MONGO_URL || "mongodb://mongo:27017";
const dbName = process.env.DB_NAME || "events";

let db;

async function connectMongo() {
  const client = new MongoClient(mongoUrl);
  await client.connect();
  db = client.db(dbName);
}

async function startConsumer() {
  await consumer.connect();
  await consumer.subscribe({
    topic: process.env.KAFKA_TOPIC || "events",
    fromBeginning: true,
  });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = message.value.toString();
      await db
        .collection("messages")
        .insertOne({ topic, value, timestamp: new Date() });
      console.log(`Consumed: ${value}`);
    },
  });
}

app.get("/health", (req, res) => res.send("OK"));

const port = process.env.PORT || 3002;
app.listen(port, async () => {
  await connectMongo();
  await startConsumer();
  console.log(`Consumer running on port ${port}`);
});
