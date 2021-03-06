var express = require('express');
var router = express.Router();
var axios = require('axios');
var jwt = require('jsonwebtoken');
const path = require('path');
var passport = require('passport')

var fs = require('fs')

var multer = require('multer')
var upload = multer({dest: 'uploads/'})
const SZip = require('node-stream-zip');

function checkAuth(req,res,next) {
  if(req.isAuthenticated()) {
    res.redirect('/main')
  }
  else {
    next();
  }
}

function verificaAutenticacao(req, res, next){
  if(req.isAuthenticated()){
    next();
  } else{
  res.redirect("/users/login");}
  }

/* GET home page. */
router.get('/', checkAuth, function(req, res) {
  res.render('index');
});

router.get('/login', function(req,res) {
  if (req.query.erro) res.render('login-form', {erro: "erro", user: ""})
  else res.render('login-form', {user: ""})
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login?erro=autenticacao' }),
function(req, res) {
  axios.post('http://localhost:7710/users/login', req.user)
    .then(dados => {
      
      res.cookie('token', dados.data.token, {
        maxAge : new Date(Date.now() + 3600000),
        secure: false, // set to true if your using https
        httpOnly: true
      });
      res.redirect('/')
    })
    .catch(e => res.render('login-form', {erro: e, user: req.body.username}))
})

router.get('/main', verificaAutenticacao, function (req,res) {
  res.render('protegida', {utilizador: req.user.id})
})

router.get('/register', function(req,res) {
  res.render('register-form', {user: "", email: "", fil: ""})
})

router.post('/register', function(req,res) {
  axios.post('http://localhost:7710/users/registar', req.body)
    .then(dados => res.redirect('/'))
    .catch(e => res.render('register-form', {error:e, user: req.body.username, email: req.body.email, fil: req.body.filiacao}))
})

module.exports = router;
