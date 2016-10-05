var jwt = require('jsonwebtoken');
var User = require('../models/user.model');
var FarmOwner = require('../models/farmOwner.model');
var config = require('../../config/config');
var mailer = require('./mailer.controller');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
mongoose.Promise = require('bluebird');

// this method creates a new user
exports.userSignup = function userSignup(req, res) {
  var user = new User();
  user.username = req.body.username;
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.email = req.body.email;
  user.password = req.body.password;
  user.phoneNo = req.body.phoneNo;
  user.address = req.body.address;

  user.save()
  .then(function(user) {
    var token = jwt.sign(user, config.secret, {
      expiresIn: 86400
    });
    mailer.welcomeMail(user.email);
    return res.status(200).send({
      success: true,
      token: token,
      message: 'Welcome ' + user.username,
      id: user._id
    });
  })
  .catch(function(err) {
    if (err.name === 'ValidationError') {
      return res.status(401).send({
        success: false,
        message: 'Please fill the required field(s)!'
      });
    }
    else if (err.code === 11000) {
      return res.status(401).send({
        success: false,
        message: 'Username Already Exists!'
      });
    }
    else {
      return res.status(403).send({
        success: false,
        message: 'An error occured.',
        error: err
      });
    }
  });
};

// this method logs a user in
exports.userLogin = function userLogin(req, res) {
  User.findOne({username: req.body.username})
  .select('username password')
  .exec()
  .then(function(user) {
    if (!user) {
      return res.status(401).send({
        success: false,
        message: 'Invalid Username or Password!'
      });
    }
    var validPassword = user.comparePassword(req.body.password);
    if (!validPassword) {
      return res.status(401).send({
        success: false,
        message: 'Invalid Username or Password!'
      });
    } 
    else {
      var token = jwt.sign(user, config.secret, {
        expiresIn: 86400
      });
      return res.status(200).send({
        success: true,
        token: token,
        message: 'Welcome ' + user.username,
        id: user._id
      });
    }
  })
  .catch(function(err) {
    return res.status(403).send({
      success: false,
      message: 'An error occured.',
      error: err
    });
  });
};

// this method creates a new farm owner
exports.farmOwnerSignup = function farmOwnerSignup(req, res) {
  var farmOwner = new FarmOwner();
  farmOwner.firstname = req.body.firstname;
  farmOwner.lastname = req.body.lastname;
  farmOwner.email = req.body.email;
  farmOwner.phoneNo = req.body.phoneNo;
  farmOwner.password = req.body.password;
  farmOwner.farmName = req.body.farmName;
  farmOwner.agricType = req.body.agricType;
  farmOwner.numOfEmployees = req.body.numOfEmployees;
  farmOwner.address = req.body.address;
  farmOwner.state = req.body.state;
  farmOwner.website = req.body.website;

  farmOwner.save()
  .then(function(farmOwner) {
    var token = jwt.sign(farmOwner, config.secret, {
      expiresIn: 86400
    });
    mailer.welcomeMail(farmOwner.email);
    return res.status(200).send({
      success: true,
      token: token,
      message: 'Welcome ' + farmOwner.firstname,
      id: farmOwner._id
    });
  })
  .catch(function(err) {
    if (err.name === 'ValidationError') {
      return res.status(401).send({
        success: false,
        message: 'Please fill the required field(s)!'
      });
    }
    else if (err.code === 11000) {
      return res.status(401).send({
        success: false,
        message: 'Farm Name Already Exists!'
      });
    }
    else {
      return res.status(403).send({
        success: false,
        message: 'An error occured.',
        error: err
      });
    }
  });
};

// this method logs in a farm owner
exports.farmOwnerLogin = function farmOwnerLogin(req, res) {
  FarmOwner.findOne({email: req.body.email})
  .select('email password firstname')
  .exec()
  .then(function(farmOwner) {
    if (!farmOwner) {
      return res.status(401).send({
        success: false,
        message: 'Invalid Email or Password!'
      });
    } 
    var validPassword = farmOwner.comparePassword(req.body.password);
    if (!validPassword) {
      return res.status(401).send({
        success: false,
        message: 'Invalid Email or Password!'
      });
    } 
    else {
      var token = jwt.sign(farmOwner, config.secret, {
        expiresIn: 86400
      });
      return res.status(200).send({
        success: true,
        token: token,
        message: 'Welcome ' + farmOwner.firstname,
        id: farmOwner._id
      });
    }
  })
  .catch(function(err) {
    return res.status(403).send({
      success: false,
      message: 'An error occured.',
      error: err
    });
  });
};

exports.forgotPassword = function forgotPassword(req, res) {
  if (!req.body.email) {
    return res.status(401).send({
      success: true,
      message: 'Please enter your email address.'
    });
  }
  else {
    var email = req.body.email;
    var resMessage = 'We have sent an email to ' + email + ' Click the link in \n\
      the email to reset your password. If you do not see the email, check \n\
      other places it might be, like your junk, spam, social, or other folders.'

    User.findOne({email: email})
    .then(function(user) {
      if (!user) {
        FarmOwner.findOne({email: email})
        .then(function(farmOwner) {
          if (!farmOwner) {
            return res.status(401).send({
              success: false,
              message: 'There is no account with that email. Please signup.'
            })
          }
          else {
            mailer.forgotPasswordMail(email);
            return res.status(200).send({
              success: true,
              message: resMessage
            })
          }
        })
        .catch(function(err) {
          return res.status(403).send({
            success: false,
            message: 'An error occured.',
            error: err
          });
        });
      }
      else {
        mailer.forgotPasswordMail(email);
        return res.status(200).send({
          success: true,
          message: resMessage
        })
      }
    })
    .catch(function(err) {
      return res.status(403).send({
        success: false,
        message: 'An error occured.',
        error: err
      });
    });
  }
};

exports.resetPassword = function resetPassword(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  if (!email || !password) {
    return res.status(401).send({
      success: true,
      message: 'Please enter your email and password.'
    });
  }
  else {
    User.findOne({email: email})
    .then(function(user) {
      if (!user) {
        FarmOwner.findOne({email: email})
        .then(function(farmOwner) {
          if (!farmOwner) {
            return res.status(401).send({
              success: false,
              message: 'There is no account with that email. Please signup.'
            })
          }
          else {
            bcrypt.hash(password, null, null, function(err, hash) {
              if (err) {
                return err;
              }
              password = hash;
              FarmOwner.update({email: email}, {$set: {password: password}})
              .then(function(farmOwner) {
                mailer.resetPasswordMail(email);
                return res.status(200).send({
                  success: true,
                  message: 'Password reset successful.'
                });
              })
              .catch(function(err) {
                return res.status(403).send({
                  success: false,
                  message: 'An error occured.',
                  error: err
                });
              });
            });
          }
        })
      }
      else {
        bcrypt.hash(password, null, null, function(err, hash) {
          if (err) {
            return err;
          }
          password = hash;
       
          User.update({email: email}, {$set: {password: password}})
          .then(function(user) {
            mailer.resetPasswordMail(email);
            return res.status(200).send({
              success: true,
              message: 'Password reset successful.'
            });
          })
          .catch(function(err) {
            return res.status(403).send({
              success: false,
              message: 'An error occured.',
              error: err
            });
          });
        });
      }
    })
    .catch(function(err) {
      return res.status(403).send({
        success: false,
        message: 'An error occured.',
        error: err
      });
    });
  }
};

// this method logs a user out
exports.logout = function logout(req, res) {
  req.session.destroy()
  .then(function(success) {
    return res.send({
      success: true,
      message: 'You have logged out.'
    });
  })
  .catch(function(err) {
    return res.status(403).send({
      success: false,
      message: 'An error occured.',
      error: err
    });
  });
};

