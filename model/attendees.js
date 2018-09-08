const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    name: {type: String, required: [true, "Please provide full name"], maxlength: [65, "You have reach the maximum length of the name"]},
    phone: {type: Number, 
            validate: {
      validator: function(v) {
        return /\d{10}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
        required: [true, 'Phone number is required']
    },
    email: {type: String, 
    maxlength: [20, "The email should be in 20 character"],
    unique: true,
    validate: { validator: (e) => {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(e);
    },
        message: props => `${props.value} is not a valid email!`
        }
    },
    seminars: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Seminar'
    }]
    
});


module.exports = mongoose.model("Attendee", Schema);