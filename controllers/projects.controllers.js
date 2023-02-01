
//https://github.com/mysqljs/mysql

const pool = require("../connection");

//Project QUERIES
// Note: some places in the documentation use ` around table names -- may need to add this
const create_project = 'INSERT INTO Projects (ProjectName, ProjectType, ProjectDescription, ProjectImage, AccessCode) VALUES (?, ?, ?, ?)'
const read_projects = 'SELECT * FROM Projects'
const read_project = 'SELECT * FROM Projects WHERE IDProjects = ?'
const update_project = 'UPDATE Projects SET ProjectName= ?, ProjectType = ?, ProjectDescription = ?, ProjectImage = ?, AccessCode = ? WHERE IDProjects = ?'
const delete_project = 'DELETE FROM Projects WHERE IDProjects = ?'

// CREATE
function createProject(req, next){
    //generate list of values for query
    const project = Object.values(req.body)

    // insert new project into database
    pool.query(create_project, project, (error, results, fields) =>{
        //if error pass to callback function
        if (error){
            next(error)
        }
        const project_id = {project_id: results.insertId}
        next(null, project_id)
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

//EXPORT FUNCTIONS
module.exports ={
    createProject, 
    readProjects,
    readProject,
    updateProject,
    deleteProject
}