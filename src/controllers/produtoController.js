// Define a utilização do model cliente e a dependência http-status
const Produto = require('../models/produto');
const status = require('http-status');
 
// Cria o método Insert, obtendo os dados da request
exports.Insert = (req, res, next) => {
    const produto = req.body.produto;
    const quantidade = req.body.quantidade;
    const preco = req.body.preco;
    const dataValidade = req.body.dataValidade;
    
 
    // Popula cada um dos campos do model com os campos recebido na request
    Produto.create({
        produto: produto,
        quantidade: quantidade,
        preco: preco,
        dataValidade: dataValidade,
    })
        //then = registra o que queremos que aconteca quando a Promise for resolvida
        .then(produto => {
            if (produto) {
                res.status(status.OK).send(produto);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        //catch = registra o que queremos que aconteca quando a Promise falhar
        .catch(error => next(error));
};

exports.SelectAll = (req, res, next) => {
    Produto.findAll()
        .then(produto => {
            if (produto) {
                res.status(status.OK).send(produto);
            }
        })
        .catch(error => next(error));
}
 
exports.SelectDetail = (req, res, next) => {
    const cod = req.params.cod;
 
    Produto.findByPk(cod)
        .then(produto => {
            if (produto) {
                res.status(status.OK).send(produto);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
 
exports.Update = (req, res, next) => {
    const cod = req.params.cod;
    const produto = req.body.produto;
    const quantidade = req.body.quantidade;
    const preco = req.body.preco;
    const dataValidade = req.body.dataValidade;
 
    Produto.findByPk(cod)
        .then(produtos => {
            if (produtos) {
                produtos.update({
                    cod: cod,
                    produto: produto,
                    preco: preco,
                    dataValidade: dataValidade,
                },
                    {
                        where: { cod: cod }
                    })
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
 
exports.Delete = (req, res, next) => {
    const cod = req.params.cod;
 
    Produto.findByPk(cod)
        .then(produto => {
            if (produto) {
                produto.destroy({
                    where: { cod: cod }
                })
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            }
            else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
 
