var mongoose = require('mongoose');
var shorten = require('../shorten.js');

var Schema = mongoose.Schema;

var urlSchema = new Schema({
  long_url: {type: String, required: true},
  short_url: String,
  created_at: Date
});

urlSchema.pre('save', function(next){
  this.created_at = new Date();
  this.short_url = shorten.shortenUrl();
  next()
});

module.exports = mongoose.model('Url', urlSchema);