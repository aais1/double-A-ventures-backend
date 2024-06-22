const router= require('express').Router();
const {loginController,signupController, getAllUsersController,deleteUserController} = require('../controllers/user')

router.post('/login',loginController)

router.post('/signup',signupController)

router.get('/getusers',getAllUsersController)

router.delete('/:id',deleteUserController)

module.exports=router