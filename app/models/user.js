var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  salt: String
});




  User.pre('save', function(next, done){
    console.log("save");
    console.log(this.hashPassword);
    var cipher = Promise.promisify(bcrypt.hash);
    cipher(this.password, null, null).bind(this)
      .then(function(hash) {
        console.log(this.password, hash);
        this.password = hash;
        next();
      });

  });

  User.methods.comparePassword = function(attemptedPassword, callback) {
    console.log(this.password, attemptedPassword);
    bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
      callback(isMatch);
    });
  }

module.exports = mongoose.model('User',User);
