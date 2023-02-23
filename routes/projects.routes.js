//PROJECTS ROUTES

const express = require('express')
const router = express.Router()

//create js object from JSON request body
const bodyParser = require('body-parser')
router.use(bodyParser.json())

const projects_ctrl = require('../controllers/projects.controllers')
//FORM 
router.get('/form', (req, res, next) => {
    res.render('project-form')
})

//CREATE
router.post('/', (req, res, next) => {
    projects_ctrl.createProject(req, (error, results)=>{
        if(error){
            res.status(403).send(error.sqlMessage)
            console.log(error)
            next(error)
            return
        }
        res.status(201)
        res.redirect('/projects')
    })
})

//READ ALL 
router.get('/', (req, res, next) => {
    projects_ctrl.readProjects((error, results)=>{
        if(error){
            res.status(403).send(error.sqlMessage)
            console.log(error)
            next(error)
            return
        }
        const userData = results

        res.status(200)
        res.render('projects', {
            title: 'Projects',
            userData
        })
    })
})

//READ ONE
router.get('/:id', (req, res, next) => {
    projects_ctrl.readProject(req, (error, results)=>{
        if(error){
            res.status(403).send(error.sqlMessage)
            console.log(error)
            next(error)
            return
        }
        const userData = results
        res.status(200)
        res.render('project-dash', {
            title: 'Projects',
            userData
        })
    })
})

//UPDATE
router.put('/:id', (req, res, next) => {
    projects_ctrl.updateProject(req, (error, results)=>{
        if(error){
            res.status(403).send(error.sqlMessage)
            console.log(error)
            next(error)
            return
        }
        res.status(200)
    })
})

//DELETE
router.delete('/:id', (req, res, next) => {
    projects_ctrl.deleteProject(req, (error, results)=>{
        if(error){
            res.status(403).send(error.sqlMessage)
            console.log(error)
            next(error)
            return
        }
        // res.status(204).json(results)
        res.status(200).json(results)
    })
})



module.exports = router