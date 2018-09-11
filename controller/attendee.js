const AttendeeBuilder = require('../Data/attendee/attendee');
const Attendee = require('../model/attendees');
const Seminar = require('../model/seminar');
var attendeeController = {};

attendeeController.registerSeminar = (req, res, next) => {
    // updateOrAddAttendee(req, res, next)
    var newA = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    }
    updateRefSeminar(req.body.seminarId, newA)
    res.redirect('/seminar');
}


attendeeController.checkExistingAttendee = (req, res, next) => {
    Seminar.findById({_id: req.body.seminarId}, (err, found) => {
        if(err) {console.log(err);};
        if(found.attendees.length > 0) {
        found.attendees.forEach((attendee) => {
            if(attendee.email === req.body.email) {
                return res.render('attendee/existEmail.ejs');
            } else {
                return next();
            }
        });
    } else {
        return next();
    }
});
};

attendeeController.loadAllAttendee = (req, res, next) => {
    findAllAttendee(req.params.id,(err, found) => {
        if(err) {
            throw err;
        } else {
            req.attendees = found[0].attendees;
            next();
        }
    });
}

var findAllAttendee = (seminarId, callback) => {
    Seminar.find({_id : seminarId}, {attendees : 1}, (err, found) => {
        callback(err, found);
    })
}

var updateRefSeminar = (seminarId, newAttendee) => {
    Seminar.findByIdAndUpdate({_id : seminarId}, {$push: {attendees : newAttendee}}, (err) => {
            if(err) throw err;
        });

}

module.exports = attendeeController;