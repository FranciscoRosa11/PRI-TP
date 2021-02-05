var express = require('express');
var router = express.Router();

function vericaNivel( a, b) {
  return a == b
}

/* GET home page. */
router.get('/', function(req, res) {
  res.status(200).jsonp({dados: "Lista publica"});
});

router.get('/secreta', function(req, res) {
  if(vericaNivel('admin', req.user.level))
    res.status(200).jsonp({dados: "Lista secreta"});
  else
    res.status(401).jsonp({error: "Não tem autorização para aceder a esta rota!"})
});

module.exports = router;
