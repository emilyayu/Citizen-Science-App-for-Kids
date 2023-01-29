//Description: 

//https://github.com/mysqljs/mysql

const pool = require("../config");

//USER QUERIES
// Note: some places in the documentation use ` around table names -- may need to add this
const create_user = 'INSERT INTO users (first_name, last_name, email, teacher) VALUES ?'
const read_users = 'SELECT * FROM users'
const read_user = 'SELECT * From users WHERE id = ?'
const update_user = 'UPDATE users SET first_name = ?, last_name = ?, email = ?, teacher = ? WHERE id = ?'
const delete_user = 'DELETE FROM users WHERE id = ?'

// CREATE
function createUser(req, next){
    //generate list of values for query
    const user = Object.values(req.body)
    console.log(user)

    //insert new user into database
    // pool.query(create_user, user, (error, results, fields) =>{
    //     //if error pass to callback function
    //     if (error){
    //         next(error)
    //     }
    // })

}


// READ ALL
function readUsers(next){
    // list all users from database
    // pool.query(read_users, (error, results, fields) =>{
    //     //if error pass to callback function
    //     if (error){
    //         next(error)
    //     }
    // })
}

// READ ONE
function readUser(req, next){
    console.log(req.params)
    // read a user from database
    // pool.query(read_user, user, (error, results, fields) =>{
    //     //if error pass to callback function
    //     if (error){
    //         next(error)
    //     }
    // })
}

// UPDATE
function updateUser(req, next){
    console.log(req.params)
    //insert new user into database
    // pool.query(update_user, user, (error, results, fields) =>{
    //     //if error pass to callback function
    //     if (error){
    //         next(error)
    //     }
    // })
}
// DELETE
function deleteUser(req, next){
    console.log(req.params)
    // read a user from database
    // pool.query(delete_user, user, (error, results, fields) =>{
    //     //if error pass to callback function
    //     if (error){
    //         next(error)
    //     }
    // })
}

//EXPORT FUNCTIONS
module.exports ={
    createUser, 
    readUsers,
    readUser,
    updateUser,
    deleteUser
}