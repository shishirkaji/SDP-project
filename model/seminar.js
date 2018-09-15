const mongoose = require("mongoose");
const datetime = require('node-datetime');

const Schema = new mongoose.Schema({
    name: {type: String, unique: [true, "The seminar with the given name already exist"],required: [true, "Please provide full name"], maxlength: [200, "You have reach the maximum length of the name"]},
    abstract: {type: String},
    date: {type: String, requied: [true, "Please input date"]},
    speaker: [{type: String}],
    time: {type: String,
         required: [true, "Please input time"]
        //  validate: { validator: (e) => {
        //     return /([0-24]{2}):([0-60]{2})/.test(e);
        // },
        //     message: props => `${props.value} is not a valid time!`
        //     }
    },
    duration: {type: Number, required: [true, "please input duration"], max: [24, "The seminar should last in one day"]},
    venue: {type: String, require: [true, "please input venue"]},
    capacity: {type: Number, required: [true, "please input capacity"]},
    attendees: [{
        name: {type: String},
        phone: {type: Number},
        email: {type: String}
    }],
    organiser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}

});


module.exports = mongoose.model("Seminar", Schema);