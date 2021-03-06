var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var jwt = require('jsonwebtoken');
var fs = require('fs') 

var recursosRouter = require('./routes/recursos');

var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/OPAIS', 
      { useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000});
  
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB...'));
db.once('open', function() {
  console.log("Conexão ao MongoDB realizada com sucesso...")
}); 

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next){
  jwt.verify(req.query.token, 'PRI-2020-TP', function(e, payload){
    if(e) res.status(401).jsonp({error: 'Erro na verificação do token: ' + e})
    else{
      req.user = { level: payload.level, username: payload.username }
      next()
    } 
  })
})

app.use(function(req, res, next){
  var publicKey = fs.readFileSync('./keys/pubkey.pem') 
  jwt.verify(req.query.token, publicKey,{ algorithms: ['RS256'] }, function(e, payload){
   if(e) res.status(401).jsonp({error:'Erro na verificação do token: ' + e}) 
   else{
     req.user = { level: payload.level, username: payload.username }
     next() 
   }  
  }) 
})

app.use('/recursos', recursosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).jsonp({error: err.message})
});

module.exports = app;
