// Insere recurso na bd
module.exports.inserir = r => {
    var novo = new Recurso(r)
    
    return novo.save()
}

// Elimina recurso da bd
module.exports.remover = function(id){
    return Recurso.deleteOne({_id: id})
}

// Elimina recurso pessoal da bd
module.exports.removerPessoal = function(id, a){
    return Recurso.deleteOne({_id: id, owner: a})
}
