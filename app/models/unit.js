const mongoose = require('mongoose');
const uuid = require('node-uuid');

const Schema = mongoose.Schema;

const unitSchema = new Schema({
  unit_city: {
    type: String,
    required: true,
  },
  unit_number: {
    type: Number,
    required: true,
  },
  id: {
    type: String,
    default: uuid.v4,
    unique: true,
  },
  companyId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Unit', unitSchema);
