const express = require('express');

const router = express.Router();

const Company = require('../models/company');
const Unit = require('../models/unit');

router.post('/unit', async (req, res, next) => {
  const unit_city = req.body.unit_city;
  const unit_number = req.body.unit_number;
  const companyId = req.body.companyId;

  // Check for empty unit city field
  if (!unit_city || unit_city.trim().length === 0) {
    console.log('Invalid INPUT - Unit City');
    return res.status(400).json({ message: 'Invalid unit city.' });
  }

  // Check for empty unit number field
  if (!unit_number || unit_number.trim().length === 0) {
    console.log('Invalid INPUT - Unit Number');
    return res.status(400).json({ message: 'Invalid unit number.' });
  }

  // Check for empty password field
  if (!companyId || companyId.trim().length === 0) {
    console.log('Invalid INPUT - Company ID');
    return res.status(400).json({ message: 'Invalid company ID.' });
  }

  Company.findOne({ id: companyId })
    .then((companyDoc) => {
      if (!companyDoc) {
        console.log('Informed company does not exists.');
        return res.status(400).json({ message: 'Company not registered.' });
      }

      const unit = new Unit({
        unit_city: unit_city,
        unit_number: unit_number,
        companyId: companyId,
      });

      try {
        unit.save();
        res.status(201).json({
          message: 'Unit Created!',
          unit: {
            id: unit.id,
            unit_city: unit_city,
            unit_number: unit_number,
            companyId: companyId,
          },
        });
        console.log('CREATED UNIT!');
      } catch (err) {
        console.error('ERROR CREATING UNIT');
        console.error(err.message);
        res.status(500).json({ message: 'Failed to create unit.' });
      }
    })
    .catch((err) => {
      console.log('Failed creating unit when comparing to COMPANY DB.');
      return res.status(400).json({ message: err });
    });
});

module.exports = router;
