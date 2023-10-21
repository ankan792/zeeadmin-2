const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
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
        password: String,
        aadharCard: String,
        aadharCard1: String,
        registrationForm: String,
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User; // Export the "User" model
