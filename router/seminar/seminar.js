const express = require('express');
const router = express.Router();
const seminarController = require('../../controller/seminar');
//SHOW ALL SEMINAR AVAILABLE
router.get('/seminar' , seminarController.loadSeminar ,(req, res) => {
    res.render('seminar/index.ejs', {seminars : req.seminars});
});

//SHOW TEMPLATE TO ADD SEMINAR
router.get('/seminar/new', (req, res) => {
    res.render('seminar/new.ejs');
});

//CREATE SEMINAR
router.post('/seminar', seminarController.addSeminar , (req, res) => {
    res.redirect('/seminar');
});


//SHOW PARTICULAR SEMINAR
router.get('/seminar/:id', seminarController.findOneSeminar, (req, res) => {
    res.render('seminar/edit.ejs', {seminar : req.seminar});
});


//EDIT PARTICULAR SEMINAR
router.put('/seminar/:id', seminarController.updateOneSeminar, (req, res) => {
    res.redirect('/seminar');
});

router.delete('/seminar/:id', seminarController.deleteOneSeminar, (req, res) => {
    res.redirect('/seminar');
});



module.exports = router;