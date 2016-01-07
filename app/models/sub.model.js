var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Sub', subSchema);