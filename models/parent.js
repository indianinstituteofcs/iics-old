const mongoose = require('mongoose');
const ParentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
const Parent = mongoose.model('Parent', ParentSchema);

module.exports = Parent;