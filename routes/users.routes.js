//USERS ROUTES

const express = require('express')
const session = require('express-session')
const router = express.Router()
//create js object from JSON request body
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const err = require('../middleware/error_helper')
const user_ctrl = require('../controllers/users.controllers')

const { requiresAuth } = require('express-openid-connect')

router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())
router.use(session({
    cookie: {maxAge: null},
    secret: 'cookie_secret',
    resave: true,
    saveUninitialized: true
}))

router.use((req, res, next)=> {
    res.locals.message = req.session.message
    delete req.session.message
    next()
})

process.on('uncaughtException', function(err) { 
    console.log( " UNCAUGHT EXCEPTION " );
    console.log( "[Inside 'uncaughtException' event] " + err.stack || err.message );
});

//CREATE
router.post('/', (req, res, next) => {
    // blocking window pop up for missing fields
    if (req.body.FirstName === "" || req.body.LastName === "" || req.body.Email === ""){
        req.session.message = {
            type: 'danger',
            intro: 'Empty fields! ',
            message: 'Please fill out all fields to add a user'
        }
        res.redirect('/users')
    } else {
        user_ctrl.createUser(req, (error, results)=>{
            if(error){
                er = err.errorMessage(error.code)
                res.status(403).send({error: er})
                next(error)
                res.redirect('/users')
            }
        
            res.status(201)
            res.redirect('/users')
        })
    }
})  

//READ ALL -- APP
router.get('/json-students', (req, res, next) => {
    user_ctrl.readUsers_app((error, results)=>{
        
        if(error){
            res.status(403).send(error)
            console.log(error)
            next(error)
            return
        }
        res.status(200).json(results)
    })
})

//READ ALL 
router.get('/', requiresAuth(), (req, res, next) => {
    let userData;
    user_ctrl.readUsers((error, results)=>{
        
        if(error){
            res.status(403).send(error)
            console.log(error)
            next(error)
            return
        }
        userData = results
        res.render('users', {
            title: 'Users',
            userData,
            userProfile: req.oidc.user
        })
    })
    res.status(200)
})

//READ ONE

router.get('/:id', (req, res, next) => {
    let userData;
    // console.log('LINE67', req)
    user_ctrl.readUser(req, (error, results)=>{
        if(error){
            res.status(403).send(error.sqlMessage)
            console.log(error)
            next(error)
            return
        }

        userData = results

        res.render('user-update', {
            title: 'Users',
            userData,
            userProfile: req.oidc.user
        })
    res.status(200)
    })
})

//UPDATE
router.put('/:id', (req, res, next) => {
    user_ctrl.updateUser(req, (error, results)=>{
        if(error){
            res.status(403).send(error.sqlMessage)
            console.log(error)
            next(error)
            res.redirect('/users')
        }
        res.status(200)
        // res.redirect("/users")
    })
})

//DELETE
router.delete('/:id', (req, res, next) => {
    user_ctrl.deleteUser(req, (error, results)=>{
        if(error){
            res.status(403).send(error.sqlMessage)
            console.log(error)
            next(error)
            return
        }

        // res.status(204).json(results) --- this should probably respond 204 No Content
        res.json(results) // honoring the "return everything" for now, so we can see the SQL packet
    })
})


module.exports = router