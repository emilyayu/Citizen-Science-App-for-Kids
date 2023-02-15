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
            res.status(403).send(error.sqlMessage)
            console.log(error)
            next(error)
            return
        }
        res.status(201)
        res.redirect('/users')
    })
})

//READ ALL 
router.get('/', (req, res, next) => {
    let userData;
    user_ctrl.readUsers((error, results)=>{
        
        if(error){
            res.status(403).send(error.sqlMessage)
            console.log(error)
            next(error)
            return
        }
        userData = results
        res.render('users', {
            title: 'Users',
            userData
        })
    })
    res.status(200)
})

//READ ONE

router.get('/:id', (req, res, next) => {
    let userData;
    // console.log('LINE67', req)
    user_ctrl.readUser(req, (error, results)=>{
        if(error){
            res.status(403).send(error.sqlMessage)
            console.log(error)
            next(error)
            return
        }

        userData = results

        res.render('user-update', {
            title: 'Users',
            userData
        })
    res.status(200)
    })
})

//UPDATE

router.post('/:id', (req, res, next) => {
    user_ctrl.updateUser(req, (error, results)=>{
        if(error){
            res.status(403).send(error.sqlMessage)
            console.log(error)
            next(error)
            return
        }
        res.redirect("/users")
        res.status(200)
    })
})

//DELETE
router.delete('/:id', (req, res, next) => {
    user_ctrl.deleteUser(req, (error, results)=>{
        if(error){
            res.status(403).send(error.sqlMessage)
            console.log(error)
            next(error)
            return
        }

        // res.status(204).json(results) --- this should probably respond 204 No Content
        res.json(results) // honoring the "return everything" for now, so we can see the SQL packet
    })
})


module.exports = router