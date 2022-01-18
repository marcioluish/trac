const express = require('express');

const router = express.Router();

const Unit = require('../models/unit');
const Asset = require('../models/asset');

router.post('/asset', async (req, res, next) => {
  const name = req.body.name;
  const description = req.body.description;
  const model = req.body.model;
  const owner = req.body.owner;
  const unitId = req.body.unitId;

  let status = '';
  if (req.body.status) status = req.body.status;

  let health_level = '';
  if (req.body.health_level) health_level = req.body.health_level;

  // Check for empty name field
  if (!name || name.trim().length === 0) {
    console.log('Invalid INPUT - Name');
    return res.status(400).json({ message: 'Invalid name.' });
  }

  // Check for empty description field
  if (!description || description.trim().length === 0) {
    console.log('Invalid INPUT - Description');
    return res.status(400).json({ message: 'Invalid description.' });
  }

  // Check for empty model field
  if (!model || model.trim().length === 0) {
    console.log('Invalid INPUT - Model');
    return res.status(400).json({ message: 'Invalid model.' });
  }

  // Check for empty owner field
  if (!owner || owner.trim().length === 0) {
    console.log('Invalid INPUT - Owner');
    return res.status(400).json({ message: 'Invalid owner.' });
  }

  // Check for empty unit ID field
  if (!unitId || unitId.trim().length === 0) {
    console.log('Invalid INPUT - Unit ID');
    return res.status(400).json({ message: 'Invalid unit ID.' });
  }

  Unit.findOne({ id: unitId })
    .then((unitDoc) => {
      if (!unitDoc) {
        console.log('Informed unit does not exists.');
        return res.status(400).json({ message: 'Unit not registered.' });
      }

      const asset = new Asset({
        name: name,
        description: description,
        model: model,
        owner: owner,
        unitId: unitId,
        status: status,
        health_level: health_level,
      });

      try {
        asset.save();
        res.status(201).json({
          message: 'Asset Created!',
          asset: {
            id: asset.id,
            name: name,
            description: description,
            model: model,
            owner: owner,
            unitId: unitId,
            status: status,
            health_level: health_level,
          },
        });
        console.log('CREATED ASSET!');
      } catch (err) {
        console.error('ERROR CREATING ASSET');
        console.error(err.message);
        res.status(500).json({ message: 'Failed to create asset.' });
      }
    })
    .catch((err) => {
      console.log('Failed creating user when comparing to UNIT DB.');
      return res.status(400).json({ message: err });
    });
});

module.exports = router;
