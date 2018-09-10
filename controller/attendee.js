const AttendeeBuilder = require('../Data/attendee/attendee');
const Attendee = require('../model/attendees');
const Seminar = require('../model/seminar');
var { promisify } = require('util');
var attendeeController = {};

attendeeController.registerSeminar = (req, res, next) => {
    updateOrAddAttendee(req, res, next)
}

attendeeController.checkExistingAttendee = (req, res, next) => {
    Attendee.find({email : req.body.email}, (err, found) => {
        if(err) throw err
        req.found = found.length;
        next();
    })
}

attendeeController.loadAllAttendee = (req, res, next) => {
    var attendees = promisify(findAllAttendee);
    attendees().then((found) => {
        
    })
    .catch((err) => {throw err});
}

var updateOrAddAttendee = (req, res, next) => {
    if(req.found === 0) {
    let newAttendee = new AttendeeBuilder(req.body.name)
    .buildEmail(req.body.email)
    .buildPhone(req.body.phone)
    .buildSeminars(req.body.seminarId)
    .build()
    newAttendee.save((err, newA) => {
        if(err) throw err
        updateRefSeminar(req.body.seminarId, newA._id);
       return next();
    });
        } else {
            Attendee.findOneAndUpdate({email : req.body.email}, {$push: {seminars: req.body.seminarId}}, (err, found) => {
                updateRefSeminar(req.body.seminarId, found._id);
                if(err) throw err
                next();
            })
        }
}

var findAllAttendee = (callback) => {
    Attendee.find({}, (err, found) => {
        callback(err, found);
    })
}

var updateRefSeminar = (seminarId, attendeeId) => {
    
    Seminar.findByIdAndUpdate({_id : seminarId}, {$push: {attendees : attendeeId}}, (err) => {
            if(err) throw err;
        });

}
module.exports = attendeeController;