const mongoose = require('mongoose');

const participantSchema = mongoose.Schema({
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

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;
