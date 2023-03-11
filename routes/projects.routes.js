//PROJECTS ROUTES

const express = require('express')
const router = express.Router()
const session = require('express-session')
//create js object from JSON request body
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const err = require('../error_helper')
const projects_ctrl = require('../controllers/projects.controllers')
//FORM 
router.get('/form', (req, res, next) => {
    res.render('project-form')
})

router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())
router.use(session({
    cookie: {maxAge: null},
    secret: 'cookie_secret',
    resave: true,
    saveUninitialized: true
}))

router.use((req, res, next) => {
    res.locals.message = req.session.message
    delete req.session.message
    next()
})

//CREATE
router.post('/', (req, res, next) => {

    if (req.body.ProjectName === "" || req.body.ProjectType === "" || req.body.ProjectDescription === "") {
        req.session.message = {
            type: 'danger',
            intro: 'Empty fields! ', 
            message: 'Please fill out all fields to create a project'
        }
        res.redirect('/projects')
    } else {
        projects_ctrl.createProject(req, (error, results)=>{
            if(error){
                er = err.errorMessage(error.code)
                res.status(403).send({error: er})
                next(error)
                res.redirect('/projects')
            }
            res.status(201)
            res.redirect('/projects')
        })
    }
})

//READ ALL 
router.get('/', (req, res, next) => {
    projects_ctrl.readProjects((error, results)=>{
        if(error){
            er = err.errorMessage(error.code)
            res.status(403).send({error: er})
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

//READ PROJECT FROM ACCESS CODE 
router.get('/accesscode/:accesscode', (req, res, next) => {
    projects_ctrl.readProjectsAccessCode(req, (error, results)=>{
        if(error){
            er = err.errorMessage(error.code)
            res.status(403).send(error.sqlMessage)
            next(error)
            return
        }

        const projectInfo = results[0]
        if (projectInfo === undefined) {
            res.status(400).send("Bad Request. No Project found.")
            return
        }
        
        res.status(200)
        res.json({
            IDProjects: projectInfo.IDProjects,
            ProjectName: projectInfo.ProjectName,
            ProjectType: projectInfo.ProjectType,
            ProjectDescription: projectInfo.ProjectDescription,
            ProjectImage: projectInfo.ProjectImage,
            AccessCode: projectInfo.AccessCode,
            ProjectInstructions: projectInfo.ProjectInstructions
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
            userData,
            IDProjects: userData[0].IDProjects
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
            res.redirect('/projects')
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
