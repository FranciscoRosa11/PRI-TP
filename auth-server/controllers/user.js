var User = require('../models/user')

// Devolve a lista de Tarefas
module.exports.listar = () => {
    return User
        .find()
        .sort('-data')
        .exec()
}

module.exports.consultar = id => {
    return User
        .findOne({_id: id})
        .exec()
}

module.exports.inserir = u => {
    var novo = new User(u)
    return novo.save()
}

module.exports.remover = uname => {
    return User.deleteOne({username: uname})
}

module.exports.alterarPW = (uname, newPW) => {
    return User.findOneAndUpdate({username: uname}, {$set: {password: newPW}});
}

// alterar a data de ultima acesso de um user
module.exports.changeLastAcess = (uname,dateLastAccess) => {
    return User.findOneAndUpdate({username: uname}, {$set: {dataUltimoAcesso: dateLastAccess}});
}