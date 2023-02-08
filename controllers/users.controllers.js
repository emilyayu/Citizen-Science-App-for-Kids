
//https://github.com/mysqljs/mysql

const pool = require("../connection");

//USER QUERIES
// Note: some places in the documentation use ` around table names -- may need to add this
const create_user = 'INSERT INTO Users (FirstName, LastName, Email, IsTeacher) VALUES (?, ?, ?, ?)'
const read_users = 'SELECT * FROM Users'
const read_user = 'SELECT * FROM Users WHERE IDUser = ?'
const update_user = 'UPDATE Users SET FirstName = ?, LastName = ?, Email = ?, IsTeacher = ? WHERE IDUser = ?'
const delete_user = 'DELETE FROM Users WHERE IDUser = ?'

class InvalidEmail extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidEmail";
    }
}

// CREATE
function createUser(req, next){
    //generate list of values for query
    const email = req.body.Email
    validEmail = ValidateEmail(email)
    
    if (validEmail) {
        const user = Object.values(req.body)
        // insert new user into database
        pool.query(create_user, user, (error, results, fields) =>{
            //if error pass to callback function
            if (error){
                next(error)
            }
            // const IDUser = {IDUser: results.insertId}
            next(null, results)
        })

        return
    }
    
    throw new InvalidEmail("invalid email format")
    return
}

function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    console.log("You have entered an invalid email address!")
    return (false)
}

// READ ALL
function readUsers(next){
    // list all users from database
    pool.query(read_users, (error, results, fields) =>{
        //if error pass to callback function
        if (error){
            next(error)
        }
        next(null, results)
    })

    return
}

// READ ONE
function readUser(req, next){
    const user_id = [req.params.id]

    // read a user from database
    pool.query(read_user, user_id, (error, results, fields) =>{
        //if error pass to callback function
        if (error){
            next(error)
        }
        next(null, results)
    })

    return
}

// UPDATE
function updateUser(req, next){

    //generate list of values with user_id
    const upd_user = Object.values(req.body)
    upd_user.push(req.params.id)

    //insert new user into database
    pool.query(update_user, upd_user, (error, results, fields) =>{
        //if error pass to callback function
        if (error){
            next(error)
        }
        next(null, results)
    })

    return
}
// DELETE
function deleteUser(req, next){
    //user id in list for query
    const user_id = [req.params.id]

    // read a user from database
    pool.query(delete_user, user_id, (error, results, fields) =>{
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
    createUser, 
    readUsers,
    readUser,
    updateUser,
    deleteUser
}