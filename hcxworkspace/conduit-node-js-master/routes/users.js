const express = require('express')
const router = express.Router()
const UserController = require('../controllers/users')
const {authByToken} = require('../middleware/auth')

router.post('/users',UserController.createUser)                     //Register a new user
router.post('/users/login',UserController.loginUser)                //Login for existing user
router.get('/user',authByToken,UserController.getUserByEmail)       //Gets the currently logged-in user
router.post('/best',UserController.updateBest)                    //Updated bestScore4
router.post('/img', UserController.updateImg)
router.post('/rank/best', UserController.getUserByBest)
router.post('/name', UserController.updateName)
module.exports = router