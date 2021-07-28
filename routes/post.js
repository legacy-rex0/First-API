const express = require('express');
const { Post } =  require('../models')
const postsController = require('../controller/post.controller');
const {checkAuth, authRole, authPage } = require('../middleware/check-auth')

const router = express.Router();

router.post('/', checkAuth, postsController.save); 
router.get('/:id', postsController.show);
router.get('/', postsController.index);
router.put('/:id', checkAuth, postsController.update);
router.delete('/:id', checkAuth, postsController.destroy);





module.exports = router;
