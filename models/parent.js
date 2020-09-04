const mongoose = require('mongoose');
const ParentSchema = new mongoose.Schema({
  parentFirstName: {
    type: String,
    required: true
  },
  parentLastName: {
    type: String,
    required: true
  },
  studentEmail: { // Can this be a list?
    type: String,
    required: false
  },
  parentEmail: {
    type: String,
    required: true
  },
  parentEmailConfirmation: {
    type: String,
    required: true
  },
  parentPassword: {
    type: String,
    required: true
  },
  parentPasswordConfirm: {
    type: String,
    required: true
  },
  parentDateAdded: {
    type: Date,
    default: Date.now
  }

});
const Parent = mongoose.model('Parent', ParentSchema);

module.exports = Parent;