const express = require('express')
const router = express.Router()

//create js object from JSON request body
const bodyParser = require('body-parser')
router.use(bodyParser.json())

const user_ctrl = require('../controllers/users.controllers')

//CREATE
router.post('/', (req, res, next) => {
    user_ctrl.createUser(req, next)
    res.status(201).end()
})

//READ ALL 
router.get('/', (req, res, next) => {
    user_ctrl.readUsers(next)
    res.status(200).send("USERS DATA")
})

//READ ONE
router.get('/:id', (req, res, next) => {
    user_ctrl.readUser(req, next)
    res.status(200).send("USER DATA")
})

//UPDATE
router.put('/:id', (req, res, next) => {
    user_ctrl.updateUser(req, next)
})

//DELETE
router.delete('/:id', (req, res, next) => {
    user_ctrl.deleteUser(req, next)
})



module.exports = router