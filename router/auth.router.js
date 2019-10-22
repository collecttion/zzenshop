var express = require('express');
const multer = require("multer");
var controller = require('../controller/auth.controller');

var router = express.Router()

//login
router.get('/login', controller.login );

router.post('/login', controller.postLogin);

module.exports = router;