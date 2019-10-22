var express = require('express');
const multer = require("multer");
var controller = require('../controller/create.controller');
var upload = multer({ dest: 'puclic/uploads/' });
var validate = require('../validate/create.validate')
var router = express.Router()




//create
router.get('/', controller.index );


router.post('/', upload.single('imgeFile'), validate.upload, controller.upload );
//delete
router.get('/table:id', controller.delete );

//HOME table
router.get('/table', controller.table );

//edit lollllllllllllllllllllllllll
router.get('/table/edit:id', controller.edit );

router.post('/uploads/:id', controller.uploadedit );


module.exports = router