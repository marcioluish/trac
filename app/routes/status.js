const express = require('express');
const { Kafka } = require('kafkajs');
const router = express.Router();
const Unit = require('../models/unit');
const Asset = require('../models/asset');

router.post('/status', async (req, res, next) => {
  const companyId = req.body.companyId;
  const assetStatus = ['Running', 'Alerting', 'Stopped'];
  let assetsList = [];
  let unitsList = [];

  const kafka = new Kafka({
    clientId: 'trac-status',
    brokers: ['broker:29092'],
  });
  const producer = kafka.producer();

  const unitsDoc = await Unit.find({ companyId: companyId }, { id: 1, _id: 0 });
  if (unitsDoc.length === 0) {
    return res.status(400).json({ message: 'Company not registered.' });
  }

  unitsDoc.map((unit) => {
    unitsList.push(unit.id);
  });

  for (unitId of unitsList) {
    const assetDoc = await Asset.find({ unitId: unitId }, { id: 1, _id: 0 });
    if (assetDoc.length === 0) {
      console.log(`No asset registered for the unit ${unitId}`);
      return res
        .status(400)
        .json({ message: `No asset registered for the unit ${unitId}` });
    }
    assetDoc.map((asset) => {
      assetsList.push(asset.id);
    });
  }

  try {
    await producer.connect();
  } catch (err) {
    console.error('ERROR CONNECTING TO KAFKA');
    console.error(err.message);
    res.status(500).json({ message: 'Failed to connect as a kafka producer.' });
  }

  let i = 0;
  const random = setInterval(async () => {
    const msg = JSON.stringify({
      key: 'status',
      assetId: assetsList[Math.floor(Math.random() * assetsList.length)],
      value: assetStatus[Math.floor(Math.random() * assetStatus.length)],
    });

    try {
      await producer.send({
        topic: 'status',
        messages: [
          {
            value: msg,
          },
        ],
      });

      i++;
      if (i == 8) {
        await producer.disconnect();
        clearInterval(random);
        res.status(200).json({
          message: 'Messages sent to assets!',
        });
      }
    } catch (err) {
      await producer.disconnect();
      clearInterval(random);
      console.log('Failed sending message to topic status.');
      return res.status(400).json({
        message: `Failed sending messages to topic status. ERROR: ${err.message}`,
      });
    }
  }, 200);
});

module.exports = router;
