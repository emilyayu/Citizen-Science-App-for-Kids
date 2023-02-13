//SOURCES: examples and model for pool queries, handling spacial data in my sql
//URL 1: https://github.com/mysqljs/mysql
//URL 2: https://dev.to/bibekkakati/how-to-store-coordinates-in-mysql-31la#:~:text=To%20insert%2Fupdate%20the%20field,of%20points%20into%20ST_GeomFromText%20function.


const pool = require("../connection");

const helper = require('../helper')

//Project QUERIES
// Note: some places in the documentation use ` around table names -- may need to add this
const create_project_entry = 'INSERT INTO ProjectEntries (EntryDate, EntryImage, EntryLatLong, ProjectsFK, UsersFK) VALUES (?, ?, ST_GeomFromText(?, 4326), ?, ?)'
const read_all_project_entries = 'SELECT * FROM ProjectEntries'
const read_project_entries= 'SELECT * FROM ProjectEntries WHERE ProjectsFK = ?'
const read_project_entry= 'SELECT * FROM ProjectEntries WHERE IDProjectEntries = ?'
const update_project_entry = 'UPDATE ProjectEntries SET EntryImage = ?, EntryLatLong = ST_GeomFromText(?, 4326) WHERE IDProjectEntries = ?'
const delete_project_entry = 'DELETE FROM ProjectEntries WHERE IDProjectEntries = ?'

// CREATE
function createProjectEntry(req, next){
    //generate list of values for query [EntryDate, EntryImage, EntryLatLong, ProjectsFK, UsersFK]
    const project_entry = helper.getProjectEntryValues(req)

    // insert new ProjectEntry into database
    pool.query(create_project_entry, project_entry, (error, results, fields) =>{
        //if error pass to callback function
        if (error){
            next(error)
        }
        // IDProjects = {project_id: results.insertId}
        next(null, results)
    })

    return
}


// READ ALL ENTRIES
function readAllProjectEntries(next){
    // list all projects from database
    pool.query(read_all_project_entries, (error, results, fields) =>{
        //if error pass to callback function
        if (error){
            next(error)
        }
        next(null, results)
    })

    return
}

// READ ENTRIES FOR A PROJECT
function readProjectEntries(req, next){
    const project_id = [parseInt(req.params.project_id)]

    // read a project from database
    pool.query(read_project_entries, project_id, (error, results, fields) =>{
        //if error pass to callback function
        if (error){
            next(error)
        }
        next(null, results)
    })

    return
}

//READ ENTRY
function readProjectEntry(req, next){
    const entry_id = [parseInt(req.params.id)]
    
    // read a project from database
    pool.query(read_project_entry, entry_id, (error, results, fields) =>{
        //if error pass to callback function
        if (error){
            next(error)
        }
        next(null, results)
    })

    return
}

// UPDATE
function updateProjectEntry(req, next){

    //**ADD** DELETE ORIGINAL IMAGE FROM BUCKET

    //generate list of values for query [EntryImage, EntryLatLong, IDProjectEntries]
    const upd_project_entry = helper.getProjectEntryUpdValues(req)

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
    createProjectEntry, 
    readAllProjectEntries,
    readProjectEntries,
    readProjectEntry,
    updateProjectEntry,
    deleteProjectEntry
}