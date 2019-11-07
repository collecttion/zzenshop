var express = require('express')
const mongoose = require('mongoose');
const Post = require('../models/post.models');



module.exports.requireAuth = async function(req, res, next){
	if (!req.cookies.userId) {
		res.redirect('/auth/login');
		return;
	}
	var post = await Post.findOne({id: req.cookies.userId});
	if (post) {
		res.redirect('/auth/login');
		return;
	}
	next();
};