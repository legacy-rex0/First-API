const router =  require('express').Router();
const userController =  require('../controller/user.controller');
const { authRole } = require('../middleware/check-auth')

router.post('/sign-up', userController.signUp);
router.post('/login', userController.login);

module.exports = router