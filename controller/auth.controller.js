var express = require('express')
const mongoose = require('mongoose');
const Post = require('../models/post.models');


module.exports.login =  async function(req, res){
    var post = await Post.find();
    res.render('auth/login',{
        post:post
    })
}; 


module.exports.postLogin = function(req, res){
	var email = req.body.email;
	var password = req.body.password;
	
	Post.findOne({email:email, password:password}, function(err, email){
		if (err) {
			console.log(err);
			return res.status(500).send();
		}

		if (!email) {
			return res.redirect('/auth/login');
		}

			res.cookie('userId', Post );
			res.redirect('/create/table')

	});


	}
