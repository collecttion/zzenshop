var express = require('express')
const mongoose = require('mongoose');
const Post = require('../models/post.models');


module.exports.login =  async function(req, res){
    var post = await Post.find();
    res.render('auth/login',{
        post:post
    })
}; 


module.exports.postLogin = async function(req, res){
	var email = req.body.email;
	var password = req.body.password;
	var user = await Post.find({});
	var users = [];
	user.forEach(function(element) {
  		users.push(element.password);
		});
	user.forEach(function(element) {
  		users.push(element.email);
		});
	console.log(email)
	if (!users[1]){	
		res.render('auth/login', {
			errors:[
				'user does not exits'
			],
			values:req.body
		});
		return;
	}
	
	if (users[2] !== password){
		res.render('auth/login', {
			errors:[
				'wrong password'
			],
			values:req.body
		});
		return;
	}

	res.cookie('userId', user.id);
	res.redirect('/management-page/management');
};
