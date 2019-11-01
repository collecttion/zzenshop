var express = require('express')
var router = express.Router()
const mongoose = require('mongoose');
const Post = require('../models/post.models');




//home post
router.get('/', async function(req, res){
    var page = parseInt(req.query.page) || 1;
	var perPage = 15;

	var start = (page - 1) * perPage;
    var end = page * perPage;
    
    var post = await Post.find();

    var rand = post[Math.floor(Math.random() * post.length)];
    var randa = post[Math.floor(Math.random() * post.length)];
    var randb = post[Math.floor(Math.random() * post.length)];
  
   	var randc = [];

   	randc.push(rand);
   	randc.push(randa);
   	randc.push(randb);


    res.render('post/index',{
        post:post.slice(start, end),
        randc:randc
    })
})





module.exports = router