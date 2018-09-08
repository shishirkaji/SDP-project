const express = require('express');
const router = express.Router();
const seminarController = require('../../controller/seminar');
//SHOW ALL SEMINAR AVAILABLE
router.get('/seminar', seminarController.addSeminar ,(req, res) => {
    res.render('seminar/index.ejs');
});

router.get('/seminar/new', (req, res) => {
    res.render('seminar/new.ejs');
});

router.post('/seminar', (req, res) => {

});

module.exports = router;