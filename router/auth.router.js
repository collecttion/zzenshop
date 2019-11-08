var express = require('express');
const multer = require("multer");
var controller = require('../controller/auth.controller');
var validate = require('../validate/create.validate');

var router = express.Router()

//login
router.get('/login',  controller.login );

router.post('/login', validate.login, controller.postLogin);

module.exports = router;