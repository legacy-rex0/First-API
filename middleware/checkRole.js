const {User} = 
function roleCheck(req, res, next){
    const role = req.body.role
    
    if(role !== 'admin' || 'user'){
        return res.status(400).json({
            message: 'Role is Correct',
            role: role
        })
    } else
    next()
}



module.exports = {
    roleCheck
}