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
const helper = require('../helper')



// Specific project entries
//FORM 
router.get('/form/:id', (req, res, next) => {

    project_ent_ctrl.getStudents(req, (error, students, project)=>{
        if(error){
            res.status(400).send('get students for select menu error')
            console.log(error)
            next(error)
            return
        }
        
        res.render('project-entries-form',
            {   IDProjects: req.params.id,
                students, 
                project
            })
    })
})

//READ SPECIFIC PROJECT ENTRY FOR EDIT
router.get('/:project_id/form/:project_entry', (req, res, next) => {

    project_ent_ctrl.readEntry(req, (error, entry, project_name, student)=>{

        if(error){
            res.status(400).send('get one project entry error')
            console.log(error)
            next(error)
            return
        }
        // const entry = entry
        const name = project_name
        const student_info = student
        res.render('update-entry-form',
            {   
                entry,
                name,
                student_info, 
                IDProjects: name[0].IDProjects,
                ProjectName: name[0].ProjectName

            })
        res.status(200)
    })
})

//UPDATE SPECIFIC ENTRY
router.post('/:project_id/form/:project_entry', multer.single('EntryImage'), (req, res, next) => {
    project_id = req.params.project_id
    project_ent_ctrl.updateProjectEntry(req, (error, results)=>{
        if(error){
            res.status(400).send('update project entry error')
            console.log(error)
            next(error)
            return
        }
        url = '/project-entries/'+ project_id
        res.redirect(url)
        res.status(200)
    })
})







// General Project-Entries

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
        res.redirect(':/id')
        res.status(201)
    })
})

//CREATE Project-entries for app
router.post('/app', multer.single('EntryImage'), (req, res, next) => {
    // console.log("ROUTES", req.body)
    // console.log(helper.getUTCDateTime())
    // console.log('www.gcloud-bucket.' +"test")
    // console.log(req.body.EntryLatLong)
    // console.log(parseInt(req.body.ProjectsFK))
    // console.log(parseInt(req.body.UsersFK))
    const project_entry = {
        EntryDate: helper.getUTCDateTime(),
        EntryImage: 'www.gcloud-bucket.' +"test",
        EntryLatLong: req.body.EntryLatLong,
        ProjectsFK: parseInt(req.body.ProjectsFK),
        UsersFK: parseInt(req.body.UsersFK) //DUMMY VALUE getUserId(onid)
    }
    // const project_values = {'EntryDate': req.body.EntryDate,"EntryImage":multer.single(req.body.EntryImage), 
    //     "EntryLatLong":req.body.EntryLatLong, "ProjetsFK": req.body.ProjectsFK, "UsersFK":req.body.UsersFK}
    console.log("LINE123", project_entry)
    
    project_ent_ctrl.createProjectEntryAPP(Object.values(project_entry), (error, results)=>{
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
    })
    res.status(201)
    console.log("SUCCESS")


})


//READ ALL 
router.get('/', (req, res, next) => {

    project_ent_ctrl.readAllProjectEntries((error, project_entries, project_name, student)=>{
        if(error){
            res.status(400).send('get all project entries error')
            console.log(error)
            next(error)
            return
        }
        const data = project_entries
        const name = project_name
        const student_info = student
        res.render('project-entries',
            {data, name, student_info})
    })        
    res.status(200)

})

// //READ ONE PROJECT'S ENTRIES
router.get('/:project_id', (req, res, next) => {

    project_ent_ctrl.readProjectEntries(req, (error, project_entries, project_name, student)=>{

        if(error){
            res.status(400).send('get one project entry error')
            console.log(error)
            next(error)
            return
        }
        
        const data = project_entries
        // console.log(data)
        const name = project_name
        const student_info = student
        res.render('specific-project-entries',
            {   
                data, 
                name, 
                student_info, 
                ProjectsFK: name[0].IDProjects,
                ProjectName: name[0].ProjectName
            })
        res.status(200)
    })
})

//READ ONE PROJECT'S ENTRIES - JSON
router.get('/entries/:project_id', (req, res, next) => {

    project_ent_ctrl.readProjectEntries(req, (error, project_entries, project_name, student)=>{

        if(error){
            res.status(400).send('get one project entry error')
            console.log(error)
            next(error)
            return
        }
        
        const data = project_entries
        res.status(200).json(project_entries)
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
