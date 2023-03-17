
//https://github.com/mysqljs/mysql

const pool = require("../connection");
const helper = require('../middleware/helper')
const err = require('../middleware/error_helper')
const { format } = require('util')
const { Storage } = require('@google-cloud/storage')
var config = require('../config')

const storage = new Storage({keyFilename: config.storage})
const bucket = storage.bucket("project-image-bucket")

//Project QUERIES
// Note: some places in the documentation use ` around table names -- may need to add this
const create_project = 'INSERT INTO Projects (ProjectName, ProjectType, ProjectDescription, ProjectImage, AccessCode) VALUES (?, ?, ?, ?, ?)'
const read_projects = 'SELECT * FROM Projects'
const read_project = 'SELECT * FROM Projects WHERE IDProjects = ?'
const read_project_access_code = 'SELECT * FROM Projects WHERE AccessCode = ?'
const update_project = 'UPDATE Projects SET ProjectName = ?, ProjectType = ?, ProjectDescription = ?, ProjectImage = ? WHERE IDProjects = ?'
const delete_project = 'DELETE FROM Projects WHERE IDProjects = ?'

// CREATE
function createProject(req, next){
    //generate list of values for query
    const project = Object.values(req.body)

    if (!("ProjectName" in req.body) || (req.body.ProjectName === "")) {
        throw new err.PropertyRequiredError("ProjectName")
    }

    if (!("ProjectType" in req.body) || (req.body.ProjectType === "")) {
        throw new err.PropertyRequiredError("ProjectType")
    }

    if (!("ProjectDescription" in req.body) || (req.body.ProjectDescription === "")) {
        throw new err.PropertyRequiredError("ProjectDescription")
    }

    if (!("ProjectImage" in req.body)) {
        throw new err.PropertyRequiredError("ProjectImage")
    }

    project.push(helper.getAccessCode())

    //ADD IMAGE with HELPER sending image to google storage
    //call helper function to store image, add image url 
    //or storage access added to the project object!


    // insert new project into database
    pool.query(create_project, project, (error, results, fields) =>{
        //if error pass to callback function
        if (error){
            next(error)
        }
        IDProjects = {project_id: results.insertId}
        next(null, IDProjects)
    })

    return
}

// READ ALL
function readProjects(next){
    // list all projects from database
    pool.query(read_projects, (error, results, fields) =>{
        //if error pass to callback function
        if (error){
            next(error)
        }
        next(null, results)
    })

    return
}

function readProjectsAccessCode(req, next){
    const projectAccesCode = [req.params.accesscode]

    // list all projects from database
    pool.query(read_project_access_code, projectAccesCode, (error, results, fields) =>{
        //if error pass to callback function
        if (error){
            next(error)
        }
        next(null, results)
    })

    return
}


// READ ONE
function readProject(req, next){
    const project_id = [req.params.id]
    
    // read a project from database
    pool.query(read_project, project_id, (error, results, fields) =>{
        //if error pass to callback function
        if (error){
            next(error)
        }
        next(null, results)
    })

    return
}

// UPDATE
function updateProject(req, next){
    //generate list of values with project_id
    const upd_project = Object.values(req.body)
    upd_project.push(req.params.id)

    //insert new project into database
    pool.query(update_project, upd_project, (error, results, fields) =>{
        //if error pass to callback function
        if (error){
            next(error)
        }

        next(null, results)
    })

    return
}
// DELETE
function deleteProject(req, next){
    //project id in list for query
    const project_id = [req.params.id]

    // read a project from database
    pool.query(delete_project, project_id, (error, results, fields) =>{
        //if error pass to callback function
        if (error){
            next(error)
        }
        next(null, results)
    })

    return
}

const upload = async (req, res) => {
    try {
        await processFileMiddleware(req, res);

        if(!req.file) {
            return res.status(400).send({message: "Please Upload a file"})
        }

        const blob = bucket.file(req.file.originalname)
        const blobStream = blob.createWriteStream({
            resumable: false,
        })

        blobStream.on("error", (err) => {
            res.status(500).send({ message: err.message })
        })

        blobStream.on("finish", async (data) => {
            // Create URL for directly file access via HTTP.
            const publicUrl = format(
              `https://storage.googleapis.com/${bucket.name}/${blob.name}`
            );
      
            try {
              // Make the file public
              await bucket.file(req.file.originalname).makePublic();
            } catch {
              return res.status(500).send({
                message:
                  `Uploaded the file successfully: ${req.file.originalname}, but public access is denied!`,
                url: publicUrl,
              });
            }
      
            res.status(200).send({
              message: "Uploaded the file successfully: " + req.file.originalname,
              url: publicUrl,
            });
          });
      
          blobStream.end(req.file.buffer);
        } catch (err) {
          res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
};

const getListFiles = async (req, res) => {
    try {
        const [files] = await bucket.getFiles();
        let fileInfos = [];
    
        files.forEach((file) => {
          fileInfos.push({
            name: file.name,
            url: file.metadata.mediaLink,
          });
        });
    
        res.status(200).send(fileInfos);
      } catch (err) {
        console.log(err);
    
        res.status(500).send({
          message: "Unable to read list of files!",
        });
      }
};

const download = async (req, res) => {
    try {
        const [metaData] = await bucket.file(req.params.name).getMetadata();
        res.redirect(metaData.mediaLink);
        
      } catch (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
};

//EXPORT FUNCTIONS
module.exports ={
    createProject, 
    readProjects,
    readProject,
    updateProject,
    deleteProject,
    readProjectsAccessCode,
    upload,
    getListFiles,
    download
}