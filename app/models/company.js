const mongoose = require('mongoose');
const uuid = require('node-uuid');

const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    default: uuid.v4,
    unique: true,
  },
});

module.exports = mongoose.model('Company', companySchema);
