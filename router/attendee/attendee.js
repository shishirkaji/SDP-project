const express = require("express");
const router = express.Router();
const attendeeController = require('../../controller/attendee');
const seminarController = require('../../controller/seminar');

//REGISTER ATTENDEE
router.get("/attendee/new/:id", seminarController.findOneSeminar ,(req, res) => {
    res.render('attendee/new.ejs', {seminar: req.seminar});
});

router.post('/attendee', attendeeController.checkExistingAttendee, (req, res, next) => {
     attendeeController.registerSeminar(req, res, next);
});

//SHOW ALL ATTENDEES
router.get("/attendee/seminar/:id", attendeeController.loadAllAttendee ,(req, res) => {
    res.render('attendee/index.ejs', {attendees: req.attendees});
});





module.exports = router;