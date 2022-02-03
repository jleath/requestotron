const mongoose = require('mongoose');

const RequestPayloadSchema = new mongoose.Schema({
  binId: {
    type: Number,
    required: true,
  },
  headers: {
    type: Map,
    required: true,
  },
  body: String,
  url: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
});

RequestPayloadSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('RequestPayload', RequestPayloadSchema)