var express = require('express');
var router = express.Router();

var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/login', function(req,res) {
  res.render('login-form')
})

router.post('/login', passport.authenticate('local'), function(req, res) {
  
  axios.post('http://localhost:7710/users/login', req.user)
    .then(dados => {
      res.cookie('token', dados.data.token, {
        maxAge : new Date(Date.now() + 3600000),
        secure: false, // set to true if your using https
        httpOnly: true
      });
      //res.redirect('/mainPage')
    })
    .catch(e => res.render('login-form', {erro: e, user: req.body.username}))
});

/*router.get('/protegida', verificaAutenticacao, function (req,res) {
  res.render('protegida', {utilizador: req.user.id})
})*/

router.get('/register', function(req,res) {
  res.render('register-form', {user: "", email: "", fil: ""})
})

router.post('/register', function(req,res) {
  axios.post('http://localhost:7710/users/registar', req.body)
    .then(dados => res.redirect('/'))
    .catch(e => res.render('register-form', {error:e, user: req.body.username, email: req.body.email, fil: req.body.filiacao}))
})

function verificaAutenticacao(req, res, next){
if(req.isAuthenticated()){
//req.isAuthenticated() will return true if user is logged in
  next();
} else{
res.redirect("/users/login");}
}

module.exports = router;
