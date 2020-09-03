const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Student = require("../models/student");
const Parent = require("../models/parent");

module.exports = function(passport){
  passport.use(new LocalStrategy(
    function(username, password, done) {
      console.log("JCTest in passport");
      
      Student.findOne({ username: username }, function (err, user) {
        console.log("username: ", username); 
        console.log("password: ", password); 
        if (err) { 
          console.log("findOne gave error"); 
          return done(err); 
        }
        if (!user) { 
          console.log("user is null"); 
          return done(null, false); 
        }
        if (!user.verifyPassword(password)) { 
          console.log("User is valid but password is bad"); 
          return done(null, false); 
        }
        console.log("valid user and password"); 
        return done(null, user);
      });
    }
  ));
};

/*
module.exports = function (passport) {
  passport.use(
    new LocalStrategy({
      usernameField: 'email'
    }, (email, password, done) => {
      //match user
      Student.findOne({
          email: email
        })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: 'that email is not registered'
            });
          }
          //match pass
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, {
                message: 'pass incorrect'
              });
            }
          })
        })
        .catch((err) => {
          console.log(err)
        })
    })

  )
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    Student.findById(id, function (err, user) {
      done(err, user);
    });
  });
};*/