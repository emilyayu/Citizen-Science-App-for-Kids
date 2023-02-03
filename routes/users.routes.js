//USERS ROUTES

const express = require('express')
const router = express.Router()

//create js object from JSON request body
const bodyParser = require('body-parser')
router.use(bodyParser.json())

const user_ctrl = require('../controllers/users.controllers')

//CREATE
router.post('/', (req, res, next) => {
    user_ctrl.createUser(req, (error, results)=>{
        if(error){
            res.status(400).send('create user error')
            console.log(error)
            next(error)
            return
        }
        res.status(201).json(results)
    })
})

//READ ALL 
router.get('/', (req, res, next) => {
    user_ctrl.readUsers((error, results)=>{
        if(error){
            res.status(400).send('get all user error')
            console.log(error)
            next(error)
            return
        }
        res.json(results)
    })
})

//READ ONE
router.get('/:id', (req, res, next) => {
    user_ctrl.readUser(req, (error, results)=>{
        if(error){
            res.status(400).send('get one user error')
            console.log(error)
            next(error)
            return
        }
        res.json(results)
    })
})

//UPDATE
router.put('/:id', (req, res, next) => {
    user_ctrl.updateUser(req, (error, results)=>{
        if(error){
            res.status('400').send('update user error')
            console.log(error)
            next(error)
            return
        }
        res.sendStatus(200)
    })
})

//DELETE
router.delete('/:id', (req, res, next) => {
    user_ctrl.deleteUser(req, (error, results)=>{
        if(error){
            res.status('400').send('delete user error')
            console.log(error)
            next(error)
            return
        }
        res.sendStatus(204)
    })
})


module.exports = router