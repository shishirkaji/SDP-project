const express = require("express");
const router = express.Router();
const authenticateController = require('../../controller/passport');

router.get('/', (req, res) => {
    res.redirect('/seminar');
});

router.get("/menu",authenticateController.isLoggin ,(req, res) => {
    res.render("main/menu.ejs");
});

module.exports = router;