const mongoose = require('mongoose');

const RequestPayloadSchema = new mongoose.Schema({
  headers: {
    type: Map,
    required: true,
  },
  body: {
    type: String,
  },
});

RequestPayloadSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('RequestPayload', RequestPayloadSchema)