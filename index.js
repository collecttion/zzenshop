
const express = require("express");
const app = express();
const pug = require("pug");
var port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Post = require('./models/post.models');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require("multer");
require('dotenv').config()

//router
var routerCreate = require('./router/create.router');
var routerPost = require('./router/post.router');
var routerAuth = require('./router/auth.router');


var upload = multer({ dest: 'puclic/uploads/' });

mongoose.connect(process.env.MONGO_URL ,{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('puclic'));
app.use(cookieParser());

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.use('/create', routerCreate);
app.use('/post', routerPost);
app.use('/auth', routerAuth);




app.get('/', async function(req, res){
    var post = await Post.find();
    res.render('index',{
        post:post
    })
})








app.listen(port, function(){
    console.log("hey,babe tuan" + port)
});