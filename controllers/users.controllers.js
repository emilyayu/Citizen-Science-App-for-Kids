//Description: 

//https://github.com/mysqljs/mysql

const pool = require("../config");

//QUERIES
// Note: some places in the documentation use ` around table names -- may need to add this
const create_user = 'INSERT INTO users (first_name, last_name, email, teacher) VALUES ?'
const read_users = 'SELECT * FROM users'
const read_user = ''
const update_user = ''
const delete_user = ''

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
function readUsers(){

}

// READ ONE
function readUser(){

}
// UPDATE
function updateUser(){
    
}
// DELETE
function deleteUser(){
    
}

//EXPORT FUNCTIONS
module.exports ={
    createUser, 
    readUsers,
    readUser,
    updateUser,
    deleteUser
}