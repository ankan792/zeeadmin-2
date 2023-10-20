const mongoose = require('mongoose');

const unverifiedUserSchema = mongoose.Schema({
  name: String,
  address: String,
  city: String,
  pinCode: String,
  representation: String,
  representation1: String,
  phoneNumber: String,
  phoneNumber1: String,
  email: String,
  regNumber: String,
  aadharCard: String,
  aadharCard1: String,
  registrationForm: String,
});

const unVerifiedUser = mongoose.model('unVerifiedUser', unverifiedUserSchema);

module.exports = unVerifiedUser;
