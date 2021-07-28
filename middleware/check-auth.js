const jwt = require('jsonwebtoken');
const { Post, User } = require('../models')


function checkAuth(req, res, next){
    try{ 
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, 'qwerty');
        req.userData = decodedToken;
        next();
    } catch(err){
        return res.status(400).json({
            message: 'Invalid and Expired Token Provided',
            err: err
        })
    }
};

function signAuth(req, res, next){
    User.findOne({where: {email: req.body.email}})
    .then(result => {
        if (result == null){
            res.status(403).json({
                message: 'You need to Sign In',
                user: req.body.email
            })
        }
        next()
    }).catch(err => {
        res.status(400).json({
            message: 'Something went Wrong',
            err: err
    })
})
};

const authPage = (permission)=>{
    return (req, res, next) => {
        const userRole = req.body.role
        if(permission.includes(userRole)){
            next()
        } else {
            return res.status(401).json('Your not Permitted')
        }
    }
}

module.exports = {
    checkAuth,
    signAuth,
    authPage
   
}