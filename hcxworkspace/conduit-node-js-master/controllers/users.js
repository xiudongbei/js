const { databaseVersion } = require('../dbConnection');
const User = require('../models/User');
const {hashPassword,matchPassword} = require('../utils/password')
const {sign,decode} = require('../utils/jwt')

module.exports.createUser = async (req,res) => {
    try{
        if(!req.body.user.username) throw new Error("Username is Required")
        if(!req.body.user.email) throw new Error("Email is Required")
        if(!req.body.user.password) throw new Error("Password is Required")
        if(!req.body.user.image) throw new Error("Img is Required")

        const existingUser = await User.findByPk(req.body.user.email)
        if(existingUser)
            throw new Error('User aldready exists with this email id')

        const password = await hashPassword(req.body.user.password);
        const user = await User.create({
            username: req.body.user.username,
            password: password,
            email: req.body.user.email,
            best: 0,
            image: req.body.user.image
        })
        
        if(user){
            if(user.dataValues.password)
                delete user.dataValues.password
            user.dataValues.token = await sign(user)
            user.dataValues.image = null
            res.status(201).json({user})
        }    
    }catch (e){
        res.status(422).json({errors: { body: [ 'Could not create user ', e.message ] }})
    }   
}

module.exports.loginUser = async (req,res) => {
    try{
        if(!req.body.user.email) throw new Error('Email is Required')
        if(!req.body.user.password) throw new Error('Password is Required')

        const user = await User.findByPk(req.body.user.email)

        if(!user){
            res.status(401)
            throw new Error('No User with this email id')
        }
        
        //Check if password matches
        const passwordMatch = await matchPassword(user.password,req.body.user.password)

        if(!passwordMatch){
            res.status(401)
            throw new Error('Invalid password or email id')
        }
            
        delete user.dataValues.password
        user.dataValues.token = await sign({email: user.dataValues.email,username:user.dataValues.username})

        res.status(200).json({user})
    }catch(e){
        const status = res.statusCode ? res.statusCode : 500
        res.status(status).json({errors: { body: [ 'Could not create user ', e.message ] }})
    }
}

module.exports.getUserByEmail = async (req,res) => {
    try{
        const user = await User.findByPk(req.user.email)
        if(!user){
            throw new Error('No such user found')
        }
        delete user.dataValues.password
        user.dataValues.token = req.header('Authorization').split(' ')[1]
        return res.status(200).json({user})
    }catch(e){
        return res.status(404).json({
            errors: { body: [ e.message ] }
        })
    }
}

module.exports.updateBest = async (req,res) => {
    try{
        const user = await User.findByPk(req.body.best.email)
        const best = await req.body.best.best
        const updatedUser = await user.update({
            best
        })
        res.json(updatedUser)
    }catch(e){
        return res.status(404).json({
            errors: { body: [ e.message ] }
        })
    }
}

module.exports.getUserByBest = async (req,res) => {
    try{
        const user = await User.findAll({
            order: [['best', 'DESC']],
            limit: 5
        })
        return res.status(200).json({user})
    }catch(e){
        return res.status(404).json({
            errors: { body: [ e.message ] }
        })
    }
}

module.exports.updateImg = async (req,res) => {
    try{
        const user = await User.findByPk(req.body.img.email)
        const image = await req.body.img.image
        const updatedUser = await user.update({
            image
        })
        res.json(updatedUser)
    }catch(e){
        return res.status(404).json({
            errors: { body: [ e.message ] }
        })
    }
}

module.exports.updateName = async (req,res) => {
    console.log(req);
    try{
        const user = await User.findByPk(req.body.uname.email)
        const username = await req.body.uname.name
        const updatedUser = await user.update({
            username
        })
        res.json(updatedUser)
    }catch(e){
        return res.status(404).json({
            errors: { body: [ e.message ] }
        })
    }
}