
const express = require("express");
const app = express();
const pug = require("pug");
var port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Post = require('./models/post.models');
var auth = require('./middleware/auth.middleware');
const bodyParser = require('body-parser');
var session = require('express-session');
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


app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

app.use(express.static('puclic'));
app.use(cookieParser());

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.use('/create', auth.requireAuth, routerCreate);
app.use('/post', routerPost);
app.use('/auth', routerAuth);


app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
})


app.get('/', async function(req, res){
    var page = parseInt(req.query.page) || 1;
    var perPage = 9;

    var start = (page - 1) * perPage;
    var end = page * perPage;
    
    var post = await Post.find();
   


    res.render('index',{
        post:post.slice(start, end),
    })
})




//view id
app.get('/post:id', async function(req, res){
    var id = req.params.id;
    var post = await Post.findById(id, function(error, idpost){
        if (error){
        console.log('id wes')
        }else{
        res.render('post/view', {
            title:idpost.name,
            conten:idpost.conten,
            img:idpost.imgeFile,
            id:idpost._id
        })
    }
    });
     
})

//Cart
app.get('/cart', function(req, res, next){
    res.render('cart/index');
});


app.get('/buy:id', async function(req, res){
    var id = req.params.id;
    
    var post = await Post.findById(id, function(error, product){
        if (req.session.cart == null ){
            req.session.cart = [
                {product: product, quantity: 1}
            ];            
        }else{
            var index = -1;
            for (var i= 0; i < req.session.cart.length; i++){
                if(req.session.cart[i].product._id == req.params.id)
                {
                    index = i;
                    break;
                }
            }
            if(index == -1){
                req.session.cart.push({
                    product: product, quantity: 1
                });
            }else{
                req.session.cart[index].quantity++;
            }
        }


        res.render('cart/index');
        console.log(product)

    });
});



app.get('/delete/:index', function(req, res, next){
    var index = parseInt(req.params.index);
    req.session.cart.splice(index, 1);

    res.redirect('/cart')

});

//pay
app.get('/cart/checkout', function(req, res, next){
    res.render('cart/checkout');
});
app.get('/send', function(req, res, next){
    res.send('oder thanh cong');
});


app.listen(port, function(){
    console.log("hey,babe tuan" + port)
});