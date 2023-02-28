//SOURCES: examples and model for pool queries, handling spacial data in my sql
//URL 1: https://github.com/mysqljs/mysql
//URL 2: https://dev.to/bibekkakati/how-to-store-coordinates-in-mysql-31la#:~:text=To%20insert%2Fupdate%20the%20field,of%20points%20into%20ST_GeomFromText%20function.


const pool = require("../connection");

const helper = require('../helper')

//Project QUERIES
// Note: some places in the documentation use ` around table names -- may need to add this
const create_project_entry = 'INSERT INTO ProjectEntries (EntryDate, EntryImage, EntryLatLong, ProjectsFK, UsersFK) VALUES (?, ?, ST_GeomFromText(?, 4326), ?, ?)'
const read_all_project_entries = 'SELECT * FROM ProjectEntries'
const read_data_all_project_entries = `SELECT ProjectEntries.IDProjectEntries, ProjectEntries.ProjectsFK,ProjectEntries.UsersFK, Users.FirstName, Users.LastName, ProjectEntries.EntryDate, ProjectEntries.EntryImage, ProjectEntries.EntryLatLong, Projects.ProjectName FROM ProjectEntries
                                        JOIN Users ON ProjectEntries.UsersFK = Users.IDUser
                                        JOIN Projects ON ProjectEntries.ProjectsFK = Projects.IDProjects
                                        ORDER BY ProjectEntries.EntryDate ASC;`

const read_project_entries= `SELECT ProjectEntries.IDProjectEntries, ProjectEntries.ProjectsFK,ProjectEntries.UsersFK, Users.FirstName, Users.LastName, ProjectEntries.EntryDate, ProjectEntries.EntryImage, ProjectEntries.EntryLatLong, Projects.ProjectName FROM ProjectEntries
                                JOIN Users ON ProjectEntries.UsersFK = Users.IDUser
                                JOIN Projects ON ProjectEntries.ProjectsFK = Projects.IDProjects
                                WHERE ProjectEntries.ProjectsFK = ?
                                ORDER BY ProjectEntries.EntryDate ASC;`
const read_gen_project_name= `SELECT * FROM Projects`
const read_project_name= `SELECT * FROM Projects 
                            WHERE Projects.IDProjects = ?`
const read_project_entry= `SELECT ProjectEntries.IDProjectEntries, ProjectEntries.ProjectsFK,ProjectEntries.UsersFK, Users.FirstName, Users.LastName, ProjectEntries.EntryDate, ProjectEntries.EntryImage, ProjectEntries.EntryLatLong, Projects.ProjectName FROM ProjectEntries
                                JOIN Users ON ProjectEntries.UsersFK = Users.IDUser
                                JOIN Projects ON ProjectEntries.ProjectsFK = Projects.IDProjects
                                WHERE IDProjectEntries = ?`

// const read_project_entry= 'SELECT * FROM ProjectEntries WHERE IDProjectEntries = ?'
const read_students= 'SELECT * FROM Users WHERE IsTeacher = 0'

const update_project_entry = 'UPDATE ProjectEntries SET EntryImage = ?, EntryLatLong = ST_GeomFromText(?, 4326) WHERE IDProjectEntries = ?'
const delete_project_entry = 'DELETE FROM ProjectEntries WHERE IDProjectEntries = ?'

//generate list of students for project-entry form
function getStudents(req, next){
    //list students
    pool.query(read_students, (error, results, fields) =>{
        //if error pass to callback function
        if (error){
            next(error)
        }
        next(null, results)
    })
}

// CREATE
function createProjectEntry(req, next){
    //generate list of values for query [EntryDate, EntryImage, EntryLatLong, ProjectsFK, UsersFK]
    const project_entry = helper.getProjectEntryValues(req)
    // console.log("Line37", project_entry)
    // insert new ProjectEntry into database
    pool.query(create_project_entry, project_entry, (error, results, fields) =>{
        //if error pass to callback function
        if (error){
            next(error)
        }
        next(null, results)
    })

    return
}


// READ ALL ENTRIES
function readAllProjectEntries(next){
    // list all projects from database
    pool.query(read_data_all_project_entries, (error, project_entries, fields) =>{
        pool.query(read_gen_project_name, (error, project_name, fields)=>{
            pool.query(read_students, (error, student, fields)=>{

                 //if error pass to callback function
                if (error){
                    next(error)
                }
                next(null, project_entries, project_name, student)
            })
        })
    })
    return
}

// READ ENTRIES FOR A PROJECT
function readProjectEntries(req, next){
    const project_id = [parseInt(req.params.project_id)]

    // read a project from database
    pool.query(read_project_entries, project_id, (error, project_entries, fields) =>{
        pool.query(read_project_name, project_id, (error, project_name, fields)=>{
            pool.query(read_students, project_id, (error, student, fields)=>{

                 //if error pass to callback function
                if (error){
                    next(error)
                }
                next(null, project_entries, project_name, student)
            })
        })
    })

    return
} 

//READ ENTRY FOR EDIT
function readEntry(req, next){
    // console.log(req.params, req.params.project_entry)
    const entry_id = [parseInt(req.params.project_entry)]
    const project_id = [parseInt(req.params.project_id)]
    
    // read a project from database
    pool.query(read_project_entry, entry_id, (error, entry, fields) =>{
        pool.query(read_project_name, project_id, (error, project_name, fields)=>{
            pool.query(read_students, project_id, (error, student, fields)=>{

                 //if error pass to callback function
                if (error){
                    next(error)
                }
                // console.log(entry)
                next(null, entry, project_name, student)
            })
        })
    })

    return
}

// UPDATE
function updateProjectEntry(req, next){

    //**ADD** DELETE ORIGINAL IMAGE FROM BUCKET

    //generate list of values for query [EntryImage, EntryLatLong, IDProjectEntries]
    entry_id= req.params.project_entry
    
    const upd_project_entry = helper.getProjectEntryUpdValues(req)
    upd_project_entry[2]=entry_id

    //insert new project into database
    pool.query(update_project_entry, upd_project_entry, (error, results, fields) =>{
        //if error pass to callback function
        if (error){
            next(error)
        }
        next(null, results)
    })

    return
}

// DELETE
function deleteProjectEntry(req, next){
    //project id in list for query
    const entry_id = [req.params.id]

    // read a project from database
    pool.query(delete_project_entry, entry_id, (error, results, fields) =>{
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
    getStudents,
    createProjectEntry, 
    readAllProjectEntries,
    readProjectEntries,
    readEntry,
    updateProjectEntry,
    deleteProjectEntry
}
