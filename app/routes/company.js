const express = require('express');

const router = express.Router();

const Company = require('../models/company');

router.post('/company', async (req, res, next) => {
  const companyName = req.body.name;

  if (!companyName || companyName.trim().length === 0) {
    console.log('Invalid INPUT - Company Name');
    return res.status(400).json({ message: 'Invalid company name.' });
  }

  const company = new Company({
    name: companyName,
  });

  try {
    company.save();
    res.status(201).json({
      message: 'Company Created!',
      company: { id: company.id, name: companyName },
    });
    console.log('CREATED COMPANY!');
  } catch (err) {
    console.error('ERROR CREATING COMPANY');
    console.error(err.message);
    res.status(500).json({ message: 'Failed to create company.' });
  }
});

module.exports = router;
