const express = require("express");
const router = express.Router();
const attendeeController = require('../../controller/attendee');
const seminarController = require('../../controller/seminar');

//SHOW FORM TO REGISTER ATTENDEE
router.get("/attendee/new/:id", seminarController.findOneSeminar ,(req, res) => {
    res.render('attendee/new.ejs', {seminar: req.seminar});
});
//REGISTER ATTENDEE
router.post('/attendee', attendeeController.checksAvailability, attendeeController.checkExistingAttendee, (req, res, next) => {
     attendeeController.registerSeminar(req, res, next);
});

//SHOW ALL ATTENDEES
router.get("/attendee/seminar/:id", attendeeController.loadAllAttendee ,(req, res) => {
    res.render('attendee/index.ejs', {attendees: req.attendees, seminarId: req.params.id});
});

//EDIT ATTENDEE
router.put("/attendee/:id/:email", attendeeController.checkExistingAttendee, attendeeController.editAttendee ,(req, res) => {
    res.redirect(`/seminar/${req.params.id}`);
});

//DELETE ATTENDEE
router.delete("/attendee/:id/:email", attendeeController.deleteAttendee ,(req, res) => {
    res.redirect('back');
});




module.exports = router;