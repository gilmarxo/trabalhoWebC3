const pessoaModel = require('../models/pessoaModel');

exports.index = (req, res) => {
    pessoaModel.get((err, pessoa) => {
        if (err) {
            res.json({
                status: "error",
                message: err.message
            })
        }
        res.json({
            status: "success",
            message: "Dados retornados",
            dados: pessoa
        })
    })
}

exports.add = (req, res) => {
    let pessoa = new pessoaModel();
    pessoa.nome = req.body.nome ? req.body.nome : pessoa.nome;
    pessoa.email = req.body.email;
    pessoa.latitude = req.body.latitude;
    pessoa.longitude = req.body.longitude;
    pessoa.data_criacao = new Date();

    pessoa.save((err) => {
        if (err) {
            res.json(err);
        }
        res.json({
            message: "Dados salvos com sucesso!",
            dados: pessoa
        })
    })
}

exports.view = (req, res) => {
    pessoaModel.findById(req.params.id, (err, pessoa) => {
        if (err) {
            res.send(err);
        }
        res.json({
            message: "Dados do objeto",
            dados: pessoa
        });
    });
}

exports.update = (req, res) => {
    pessoaModel.findById(req.params.id, (err, pessoa) => {
        if (err) res.send(err);
        pessoa.nome = req.body.nome;
        pessoa.email = req.body.email;
        pessoa.latitude = req.body.latitude;
        pessoa.longitude = req.body.longitude;
        pessoa.data_atualizacao = new Date();

        pessoa.save(err => {
            if (err) res.json(err);
            res.json({
                message: "Dados atualizados com sucesso!",
                dados: pessoa
            })
        })
    })
}

exports.delete = (req, res) => {

    pessoaModel.deleteOne({
        _id: req.body.id
    }, (err, resposta) => {
        if (err) res.send(err);
        res.json({
            status: 'Dados deletados com sucesso!',
            message: 'Exclusão realizda!'
        })
    })
}