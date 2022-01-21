const mongoose = require('mongoose');
const uuid = require('node-uuid');

const Schema = mongoose.Schema;

const assetSchema = new Schema({
  id: {
    type: String,
    default: uuid.v4,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  model: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  unitId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Asset', assetSchema);
