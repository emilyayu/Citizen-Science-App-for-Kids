//PROJECT ENTRIES ROUTES
//URL 3: https://www.npmjs.com/package/multer
//URL 4: https://cloud.google.com/appengine/docs/flexible/using-cloud-storage?tab=node.js

const express = require('express')
const router = express.Router()
const Multer = require('multer');

// Multer is required to process file uploads and make them available via
// req.files.
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
  });

//create js object from JSON request body
const bodyParser = require('body-parser')
router.use(bodyParser.json())

const project_ent_ctrl= require('../controllers/project-entries.controllers')

//CREATE
router.post('/', multer.single('EntryImage'), (req, res, next) => {
    project_ent_ctrl.createProjectEntry(req, (error, results)=>{
        if (!req.file) {
            res.status(400).send('No file uploaded.');
            return;
        }

        if(error){
            res.status(400).send('create project entry error')
            console.log(error)
            next(error)
            return
        }

        res.status(201).json(results)
    })
})

//READ ALL 
router.get('/', (req, res, next) => {
    project_ent_ctrl.readAllProjectEntries((error, results)=>{
        if(error){
            res.status(400).send('get all project entries error')
            console.log(error)
            next(error)
            return
        }
        res.status(200).json(results)
    })
})

//READ ONE PROJECT'S ENTRIES
router.get('/projects/:project_id', (req, res, next) => {
    project_ent_ctrl.readProjectEntries(req, (error, results)=>{
        if(error){
            res.status(400).send('get one project entry error')
            console.log(error)
            next(error)
            return
        }
        res.status(200).json(results)
    })
})

//READ ONE
router.get('/:id', (req, res, next) => {
    project_ent_ctrl.readProjectEntry(req, (error, results)=>{
        if(error){
            res.status(400).send('get one project entry error')
            console.log(error)
            next(error)
            return
        }
        res.status(200).json(results)
    })
})

//UPDATE
router.patch('/:id', multer.single('EntryImage'), (req, res, next) => {
    project_ent_ctrl.updateProjectEntry(req, (error, results)=>{
        if(error){
            res.status(400).send('update project entry error')
            console.log(error)
            next(error)
            return
        }
        res.status(200).json(results)
    })
})

//DELETE
router.delete('/:id', (req, res, next) => {
    project_ent_ctrl.deleteProjectEntry(req, (error, results)=>{
        if(error){
            res.status(400).send('delete project entry error')
            console.log(error)
            next(error)
            return
        }
        // res.status(204).json(results)
        res.status(200).json(results)
    })
})



module.exports = router