//USERS ROUTES

const express = require('express')
const router = express.Router()

//create js object from JSON request body
const bodyParser = require('body-parser')
router.use(bodyParser.json())

const projects_ctrl = require('../controllers/projects.controllers')

//CREATE
router.post('/', (req, res, next) => {
    projects_ctrl.createProject(req, (error, results)=>{
        if(error){
            res.status(400).send('create projects error')
            console.log(error)
            next(error)
            return
        }
        res.json(results)
    })
})

//READ ALL 
router.get('/', (req, res, next) => {
    projects_ctrl.readProjects((error, results)=>{
        if(error){
            res.status(400).send('get all projects error')
            console.log(error)
            next(error)
            return
        }
        res.json(results)
    })
})

//READ ONE
router.get('/:id', (req, res, next) => {
    projects_ctrl.readProject(req, (error, results)=>{
        if(error){
            res.status(400).send('get one projects error')
            console.log(error)
            next(error)
            return
        }
        res.json(results)
    })
})

//UPDATE
router.put('/:id', (req, res, next) => {
    projects_ctrl.updateProject(req, (error, results)=>{
        if(error){
            res.status(400).send('update projects error')
            console.log(error)
            next(error)
            return
        }
        res.sendStatus(200)
    })
})

//DELETE
router.delete('/:id', (req, res, next) => {
    projects_ctrl.deleteProject(req, (error, results)=>{
        if(error){
            res.status(400).send('delete projects error')
            console.log(error)
            next(error)
            return
        }
        res.sendStatus(204)
    })
})



module.exports = router