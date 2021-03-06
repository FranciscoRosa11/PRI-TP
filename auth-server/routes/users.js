var express = require('express');
var router = express.Router();
var User = require('../controllers/user')

var passport = require('passport')
var jwt = require('jsonwebtoken')

// Login page
router.get('/login', function(req, res) {
  res.render('login-form')
})

router.get('/logout', function(req, res){
  req.logout();
  req.session.destroy(function (err) {
    if (!err) {
        res.redirect('/');
    } else {
        console.log('Destroy session error: ', err)
    }
  });
});

router.post('/login', function(req,res) {
  console.log(req.body)
  jwt.sign({username: req.body.username}, "PRI-2020-TP", function(e,token) {
              if(e) res.status(500).jsonp({error: "Erro na geração do token: " + e}) 
              else{
                User.consultar(req.body.username)
                  .then(dados => {
                    dados => res.status(201).jsonp({token: token})
                  })
                  .catch(e => res.status(500).jsonp({error: "Erro no consultar: " + e}))
                
              }
            })
})

router.post('/registar', function(req,res) {
  console.log(req.body)
  req.body.dataRegisto = new Date().toISOString().slice(0, 16).split('T').join(' ')
  req.body.dataUltimoAcesso = ''
  User.consultar(req.body.username)
    .then(dados => {
      if (dados == null)
      {
        User.inserir(req.body)
          .then(dados => res.status(201).jsonp({dados: dados}))
          .catch(e => res.status(500).jsonp({error: e}))
      }
      else res.status(500).jsonp("User ja existente")
    }).catch( e => {console.log("catch"); res.status(500).jsonp({error: e})})
  
})

module.exports = router;