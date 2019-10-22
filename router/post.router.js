var express = require('express')
var router = express.Router()
const mongoose = require('mongoose');
const Post = require('../models/post.models');




//home post
router.get('/', async function(req, res){
    var page = parseInt(req.query.page) || 1;
	var perPage = 9;

	var start = (page - 1) * perPage;
    var end = page * perPage;
    
    var post = await Post.find();
    res.render('post/index',{
        post:post.slice(start, end),
    })
})


//view id
router.get('/:id', async function(req, res){
    var id = req.params.id;
    var post = await Post.findById(id, function(error, idpost){
        if (error){
        console.log('id wes')
        }else{
        res.render('post/view', {
            title:idpost.name,
            conten:idpost.conten,
            img:idpost.imgeFile
        })
    }
    });
     
})




module.exports = router