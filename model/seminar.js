const mongoose = require("mongoose");
const datetime = require('node-datetime');

const Schema = new mongoose.Schema({
    name: {type: String, required: [true, "Please provide full name"], maxlength: [200, "You have reach the maximum length of the name"]},
    abstract: {type: String},
    date: {type: Date, requied: true},
    speaker: [{type: mongoose.Schema.Types.ObjectId, ref: "Speaker"}],
    time: {type: Date, required: true},
    duration: {type: Number, required: true},
    venue: {type: String, require: true},
    capacity: {type: Number, required: true},
    attendees: [{type: mongoose.Schema.Types.ObjectId, ref: "Attendee"}]
});


module.exports = mongoose.model("Seminar", Schema);