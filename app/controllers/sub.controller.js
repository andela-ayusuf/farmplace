var Sub = require('../models/sub.model');
var config = require('../../config/config');

exports.subscribe = function(req, res) {
  var sub = new Sub();
  sub.email = req.body.email;
  sub.save(function(err) {
    if (!sub.email) {
      res.status(401).send({
        success: false,
        message: 'Please Enter a Valid Email!'
      });
    }
    else if (err) {
      res.status(401).send(err);
    }
    else {
      res.status(200).send({
        success: true,
        message: 'Thanks. We will keep you updated.'
      });
    }
  });
};