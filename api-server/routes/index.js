var express = require('express');
var router = express.Router();

const Tarefa = require('../controllers/tarefa')

// Listar todos os users
// Consultar user
router.get('/users/:id', function(req, res) {
  axios.get("http://localhost:7910/users/" + req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

module.exports = router;
