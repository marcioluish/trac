const mongoose = require('mongoose');
const uuid = require('node-uuid');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    default: uuid.v4,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  companyId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
