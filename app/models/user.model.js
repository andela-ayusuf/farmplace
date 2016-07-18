var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var Job = require('./job.model');

var userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required:true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	phoneNo: {
		type: Number,
		required: true,
		unique: true,
		trim: true
	},
	address: {
		type: String,
		required: true
	}
});

userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function(password) {
  var user = this;
  return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', userSchema);

