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
    required: true
  },
  parentEmail: {
    type: String,
    required: true
  },
  reln2Students: {
    type: String, //Dropdown list. Father, Mother, Legal Guardian
    required: true
  },
  parentPassword: {
    type: String,
    required: true
  }
});
const Parent = mongoose.model('Parent', ParentSchema);

module.exports = Parent;