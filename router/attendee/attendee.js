const express = require("express");
const router = express.Router();
const attendeeController = require('../../controller/attendee');
const seminarController = require('../../controller/seminar');
router.get("/attendee/new/:id", seminarController.findOneSeminar ,(req, res) => {
    res.render('attendee/new.ejs', {seminar: req.seminar});
});

router.post('/attendee', attendeeController.checkExistingAttendee ,attendeeController.registerSeminar ,(req, res) => {
    res.send('work');
});




module.exports = router;