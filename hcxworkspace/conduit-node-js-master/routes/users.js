const express = require('express')
const router = express.Router()
const UserController = require('../controllers/users')
const {authByToken} = require('../middleware/auth')

router.post('/users',UserController.createUser)                     //Register a new user
router.post('/users/login',UserController.loginUser)                //Login for existing user
router.get('/user',authByToken,UserController.getUserByEmail)       //Gets the currently logged-in user
router.patch('/user',authByToken,UserController.updateUserDetails)  //Updated user information for current user
router.post('/img', UserController.updateImg)                       //Updated user image
router.post('/rank/best', UserController.getUserByBest)             //Rank user by best
router.post('/name', UserController.updateName)                     //Update user name
module.exports = router