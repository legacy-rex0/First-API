const e = require('express');
const Validator = require('fastest-validator');

const models = require('../models')

function save(req, res){
    const post = {
        title: req.body.title,
        content: req.body.content,
        image_url: req.body.image_url,
        categoryId: req.body.categoryId,
        userId: 1
    }

    const schema = {
        title: {type:"string", optional: false, min:"5", max: "90"},
        content: {type:"string", optional: false, max: "400"},
        categoryId: {type:"number", optional: false},
    }

    const v = new Validator();
    const validRes = v.validate(post, schema);

    if(validRes !== true){
        return res.status(400).json({
            message: 'Validation Failed',
            errors: validRes
        })
    }

    models.Post.create(post)
    .then(result => {
        res.status(201).json({
            message: "Post was Successfully Created",
            post: result
        })
    }).catch(err => {
        res.status(500).json({
            message: "Something went Wrong",
            error: err
        })
    })
};

function show(req, res){
    const id = req.params.id

    models.Post.findByPk(id)
    .then(result => {
        res.json(result)
    }).catch(err => {
        res.status(400).json({
            message: "Something went wrong",
            error: err
        })
    })
};

function index(req, res){
    models.Post.findAll()
    .then(result => {
        res.json(result)
    }).catch(err => {
        res.status(400).json({
            message: 'Something Went Wrong',
            error: err
        })
    })
};

function update(req, res){
    const id = req.params.id;

    const updatedPost = {
        title: req.body.title,
        content: req.body.content,
        image_url: req.body.image_url,
        categoryId: req.body.categoryId,
    }
    const userId = 1;

    const schema = {
        title: {type:"string", optional: false, min:"5", max: "90"},
        content: {type:"string", optional: false, max: "400"},
        categoryId: {type:"number", optional: false},
    }

    const v = new Validator();
    const validRes = v.validate(updatedPost, schema);

    if(validRes !== true){
        return res.status(400).json({
            message: 'Validation Failed',
            errors: validRes
        })
    }

    models.Post.update(updatedPost, {where: {id, userId}})
    .then(result => {
        if(result){
            res.json({
                message: 'Post was updated successfully',
                Post: updatedPost
            })
        }else{
            res.json({
                message: 'Page not Found'
            })
        }
    }).catch(err => {
        res.status(400).json({
            message: 'Something went Wrong',
            error: err
        })
    })
};

function destroy(req, res){
    const id = req.params.id;
    const userId = 1
    models.Post.destroy({where: {id, userId}})
    .then(result => {
        if(result){
            res.json({
                message: 'Account Deleted',
                post: result
            })
        }else {
            res.json({
                messsage: 'Post Does not Exist'
            })
        }
        
    }).catch(err => {
        res.status(500).json({
            message: 'Something went wrong',
            error: err
        })
    })
}

module.exports = {
    save: save,
    show,
    index,
    update,
    destroy

}