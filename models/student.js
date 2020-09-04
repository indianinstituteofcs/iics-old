const mongoose = require('mongoose');
const StudentSchema = new mongoose.Schema({
  studentFirstName: {
    type: String,
    required: true
  },
  studentLastName: {
    type: String,
    required: true
  },
  school: { //Should be a dropdown list
    type: String,
    required: true
  },
  grade: { //Should be a dropdown list
    type: String,
    required: true
  },
  email: { //Serves as username
    type: String,
    required: true
  },
  password: { //Will be created by admin
    type: String,
    required: true
  },
  parentEmail: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;