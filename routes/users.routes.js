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
    let userData;
    user_ctrl.readUsers((error, results)=>{
        
        if(error){
            res.status(400).send('get all user error')
            console.log(error)
            next(error)
            return
        }
        userData = results
        // res.status(200).json(results)
        res.render('users', {
            title: 'Users',
            userData
        })
    })
    res.status(200)
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
        res.status(200).json(results)
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
        res.status(200).json(results)
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

        // res.status(204).json(results) --- this should probably respond 204 No Content
        res.json(results) // honoring the "return everything" for now, so we can see the SQL packet
    })
})


module.exports = router