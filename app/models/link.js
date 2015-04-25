var crypto = require('crypto');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var Link = new Schema({
  linkid: Number,
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: Number
});


Link.pre('save', function(next, done) {

  console.log(this);
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});



module.exports = mongoose.model('Link', Link);
