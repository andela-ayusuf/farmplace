var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var farmOwnerSchema = new Schema({
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
	phoneno: {
		type: Number,
		required: true,
		unique: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	farmName: {
		type: String,
		required: true,
		unique: true
	},
	website: {
		type: String
	},
	address: {
		type: String,
		required: true
	}
});

farmOwnerSchema.pre('save', function(next) {
  var farmOwner = this;
  if (!farmOwner.isModified('password')) {
    return next();
  }
  bcrypt.hash(farmOwner.password, null, null, function(err, hash) {
    if (err) {
      return next(err);
    }
    farmOwner.password = hash;
    next();
  });
});

farmOwnerSchema.methods.comparePassword = function(password) {
  var farmOwner = this;
  return bcrypt.compareSync(password, farmOwner.password);
};

module.exports = mongoose.model('FarmOwner', farmOwnerSchema);

