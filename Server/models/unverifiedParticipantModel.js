const mongoose = require('mongoose');

const unverifiedParticipantSchema = mongoose.Schema({
    name: String,
    videoLink: String,
    selectedCategory: String,
    participantName: String,
    forMyself: Boolean,
    age: String,
    gender: String,
    aadharCard: String, 
    forMyChild: Boolean,
    childAge: String,
    childGender: String,
    parentName: String,
    relationship: String, 
    aadharCard1: String,
});

const unVerifiedParticipant = mongoose.model('unVerifiedParticipant', unverifiedParticipantSchema);

module.exports = unVerifiedParticipant;
