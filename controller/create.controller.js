
var express = require('express')
const mongoose = require('mongoose');
const Post = require('../models/post.models');
var controller = require('../controller/create.controller')



//create
module.exports.index = function(req, res){
    res.render('create/index')
};

module.exports.upload = async function(req, res){
        

    req.body.imgeFile = req.file.path.split('puclic/').slice(1).join('/');

    var posts = new Post(req.body);


    posts.save(function(error){
        if(error)
            return res.json({ posts : posts })
    })

    res.redirect('create/table')

};
//delete


module.exports.delete = async function(req, res){
    var errors = [];
    var id = req.params.id;
    var psost = await Post.findByIdAndDelete(id, function(err){
        if(err){
            console.log("Err deleteting ebook");
            console.log(err);
        }else{
			console.log('delete ' + id);
			res.redirect('/create/table')
        }
    })
};
//HOME table

module.exports.table = async function(req, res){
    var post = await Post.find();
    res.render('create/table',{
        post:post
    })
};
//edit lollllllllllllllllllllllllll

module.exports.edit = async function(req, res){
    var id = req.params.id;
    var post = await Post.findById(id, function(error, idpost){
        if (error){
        console.log('id wes')
        }else{
            res.render('create/edit',{
                post:idpost

            })
        }
    });
};

module.exports.uploadedit = async function (req, res) {
    var post = await Post.find();
    var post = new Post({
        name: req.body.name,
        conten: req.body.conten,
                    // etc etc
    });

    var upsertData = post.toObject();
    console.log(upsertData);
    delete upsertData._id;      

    return Post.updateOne({ _id: req.params.id }, upsertData, {upsert: true}, function(err) {
          if (!err) {
              return res.redirect(303, 'create/table') // N
          } else {
              console.log(err);
              return res.send(404, { error: "Person was not updated." });
          }
    });
};
