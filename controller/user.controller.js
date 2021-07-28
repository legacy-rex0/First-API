const {User} = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

function signUp(req, res){

    User.findOne({where:{email: req.body.email}})
    .then(result => {
        if(result){
            res.status(403).json({
                message: 'User already exists',
                user: req.body.email})
        }else{
            
            bcryptjs.genSalt(12, function(err, salt){
                bcryptjs.hash(req.body.password, salt, function (err, hashed){
                    
                    const user = {
                        name: req.body.name,
                        role: req.body.role,
                        email: req.body.email,
                        password: hashed
                    }
                    User.create(user)
                    .then(result => {
                        res.status(201).json({
                            message: 'User has been Created',
                            user: result
                        })
                    }).catch(err => {
                        res.status(400).json({
                            message: 'Something went wrong',
                            error: err
                        })
                    })
                })
            })
        }

    }).catch(err => {
        res.status(400).json({
            message: 'Something went wrong',
            error: err
        })
    })
    
}

function login(req, res){
    User.findOne({where:{email: req.body.email}})
    .then(user => {
        if(user === null){
            res.status(401).json({
                message: 'Invalid Credentials',
                user: req.body.email
            })
        } else {
            bcryptjs.compare(req.body.password, user.password, function(err, result){
                if(result){
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.userId}, 'qwerty', function(err, token){
                            res.status(201).json({
                                message: 'Authentication Sucessful',
                                token,
                            })
                        }
                    );
                } else {
                    res.status(400).json({
                        message: 'Something went wrong',
                        error: err
                    })
                }
            });
        }
    })
    .catch(err => {
 res.status(400).json({
            message: 'Something went wrong',
            error: err
        })
    });
};


module.exports = {
    signUp,
    login
}