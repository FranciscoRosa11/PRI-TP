var express = require('express');
var router = express.Router();

var passport = require('passport')

// Login page
router.get('/login', function(req, res) {
  res.render('login-form')
})

/* GET users listing. */
router.post('/login', passport.authenticate('local'), function(req, res){
  res.redirect('/protegida')
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

module.exports = router;
