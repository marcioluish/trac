const express = require('express');
const { Kafka } = require('kafkajs');
const router = express.Router();

const io = require('../socket');

router.get('/kafka', async (req, res, next) => {
  const clientId = 'trac-status';
  const kafka = new Kafka({
    clientId: clientId,
    brokers: ['broker:29092'],
  });
  const consumer = kafka.consumer({ groupId: clientId });

  await consumer.connect();
  await consumer.subscribe({ topic: 'status' });
  await consumer.subscribe({ topic: 'health_level' });

  let message;
  await consumer.run({
    eachMessage: ({ message }) => {
      console.log(JSON.parse(message.value));
      io.getSocket().emit('assets-data', {
        assetData: JSON.parse(message.value),
      });
    },
  });
});

module.exports = router;
