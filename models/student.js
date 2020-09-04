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
  studentSchool: { //Should be a dropdown list
    type: String,
    required: true
  },
  studentGrade: { //Should be a dropdown list
    type: String,
    required: true
  },
  studentEmail: { //Serves as username
    type: String,
    required: true
  },
  studentParentEmail: {
    type: String,
    required: false
  },
  studentDateAdded: {
    type: Date,
    default: Date.now
  }
});
const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;