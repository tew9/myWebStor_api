const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var salt = bcrypt.genSaltSync(10);
//create schema
const userSchema = new mongoose.Schema({
  firstName:{
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 20
  },
  lastName:{
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 20
  },
  userName:{
    type: String,
    required: true,
    trim: true,
    min: 5,
    max: 20,
    unique: true,
    index: true,
    lowercase: true
  },
  email:{
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  hash_password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['customer', 'admin', 'business-owner'],
    default: 'customer',
  },
  cantactNumber: String,
  profilePicture: String
}, {timestampts: true})

//bcrypt to hash the password
userSchema.virtual('password')
.set(function(password){
  this.hash_password = bcrypt.hashSync(password, salt);
});

userSchema.virtual('fullName')
.get(function(){
  return `${this.firstName} ${this.lastName}`;
});

userSchema.methods = {
  authenticate: function(password){
     return bcrypt.compareSync(password, this.hash_password)
    }
}

module.exports = mongoose.model('User', userSchema);