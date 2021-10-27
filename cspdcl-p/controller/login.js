const express =require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../model/db_controller')
const mysql = require('mysql');
const session = require('express-session')
const sweetalert = require('sweetalert2')
const {check, validationResult} = require('express-validator');


router.use(express.urlencoded({extended: true}));
router.use(express.json());


const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'Password@123',
    database: 'nodejs'
})

router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))


router.post('/',[check('username').notEmpty().withMessage('username is required'),
check('password').notEmpty().withMessage('password required')
],function(req,res){
  const errors = validationResult(req)
  if(!errors.isEmpty()){
  return res.status(422).json({errors:errors.array()})
  }
  const username =req.body.username;
  const password = req.body.password;
  console.log(username);

  if(username&&password){
      connection.query('SELECT * FROM users WHERE username= ? AND password= ?',[username,password],function(error,results,fields){
          if(results.length >0){
              req.session.loggedIn = true;
              req.session.username = username;
              res.cookie('username',username);

              const status = results[0].email_status
              if(status== 'not_verified'){
                  res.send('Please Verify Your Email')
              }
              else{
              sweetalert.fire('Logged In')
              res.redirect('/home') 
            }
          }else{
            res.send('Incorrect Username/password')
        }
        res.end();
      })
  }else{
      res.send('Please enter your username and password')
      res.end();
  }
  
})

module.exports =router;