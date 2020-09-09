const express = require('express');
const router = express.Router();
const Student = require("../models/student.js")
const Parent = require("../models/parent.js")
const bcrypt = require('bcrypt');
const passport = require('passport');


//logout
router.get('/logout', (req, res) => {})
module.exports = router;

