const express =require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../model/db_controller')
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const randomToken = require('random-token');

const {check, validationResult} = require('express-validator');
router.use(express.urlencoded({extended: true}));
router.use(express.json());

router.post('/',[check('username').notEmpty().withMessage('username is required'),
check('password').notEmpty().withMessage('password required'),
check('email').notEmpty().withMessage('email is required')
],function(req,res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors:errors.array()})
    }
    const email_status = 'not_verified'
    const email = req.body.email;
    const username = req.body.username;
    
    db.signup(req.body.username,req.body.email,req.body.password,email_status);
    const token = randomToken(8);
    db.verify(req.body.username,email,token)

    db.getuserId(email,function(err,result){
        const id = result[0].id;
        const output = `<p> Dear user ${username},</p>
        <p>Thanks for Signing Up. Your Verification Id and token is given below:</p>
        <ul>
        <li>User Id: ${id}</li>
        <li>Token: ${token}</li>
        </ul>
        <p>verify link: <a href="http://localhost:5000/verify">Verify</a></p>
        <p><b>This is an automatically generated mail</b></p>
    
        `;
        const transporter = nodemailer.createTransport({
            host:'smtp.example.com',
            port:465,
            secure: true,
            auth:{
                user:'cspdcl.test@gmail.com',
                pass:'Jay@201101'
            }
        })
         const mailOptions ={
             from:'cspdcl',
             to:email,
             subject:'Email Verification',
             html: output
         };
         transporter.sendMail(mailOptions,function(err,info){
          if(err){
              return console.log(err);
          }
          console.log(info)
         })
         res.send('Check your Email for token to verify')
    })
})
module.exports = router;