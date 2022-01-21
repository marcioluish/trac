const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const Company = require('../models/company');
const User = require('../models/user');

router.post('/signup', async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const companyId = req.body.companyId;

  // Check for empty username field
  if (!username || username.trim().length === 0) {
    console.log('Invalid INPUT - Username');
    return res.status(400).json({ message: 'Invalid username.' });
  }

  // Check for empty password field
  if (!password || password.trim().length === 0) {
    console.log('Invalid INPUT - Password');
    return res.status(400).json({ message: 'Invalid password.' });
  }

    // Check for empty company id field
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
      User.findOne({ username: username })
        .then((userDoc) => {
          if (userDoc) {
            console.log('User already exists.');
            return res
              .status(400)
              .json({ message: 'User already registered.' });
          }

          bcrypt.hash(password, 12).then((hashedPassword) => {
            const user = new User({
              username: username,
              password: hashedPassword,
              companyId: companyId,
            });

            try {
              user.save();
              res.status(201).json({
                message: 'User Created!',
                user: { id: user.id, username: username, companyId: companyId },
              });
              console.log('CREATED USER!');
            } catch (err) {
              console.error('ERROR CREATING USER');
              console.error(err.message);
              res.status(500).json({ message: 'Failed to create user.' });
            }
          });
        })
        .catch((err) => {
          console.log('Failed creating user when comparing to USER DB.');
          return res.status(400).json({ message: err });
        });
    })
    .catch((err) => {
      console.log('Failed creating user when comparing to COMPANY DB.');
      return res.status(400).json({ message: err });
    });
});

module.exports = router;
