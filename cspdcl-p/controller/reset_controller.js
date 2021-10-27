const express= require('express');
const flash = require('flash');
const router= express.Router();
const bodyParser= require('body-parser')
const nodemailer = require('nodemailer')
const randomToken = require('random-token');


const db = require('../model/db_controller')
module.exports = router;

router.get('/',function(req,res){
  res.render('resetpassword.hbs')
});
 
router.post('/',function(req,res){
    const email = req.body.email;
    db.findone(email,function(err,resultone){
        if(!resultone){
            console.log('Mail Doesnot Exist')
            res.redirect
        }
        const id = resultone[0].id
        const email = resultone[0].email;
        const token = randomToken(8);
        db.temp(id,email,token,function(err,resulttwo){
            var output = `<p>Dear User,</p>
                         <p>You are receiving this mail because you requested to reset your password</p>
                         <ul>
                         <li>User ID: `+id+`</li>
                         <li>Token: `+token+`</li>
                         </ul>

                         `
            const transporter = nodemailer.createTransport({
                service:'gmail',
                auth:{
                    user:'jay2222.sharma@gmail.com',
                    password:'9993878355'
                }
            }) 
            const mailOptions ={
                from:'cspdcl',
                to:email,
                subject:'Password Reset',
                html:output
            };
            transporter.sendMail(mailOptions,function(err,info){
                if(err){
                    console.log(error)
                }
                else{console.log(info)
                }
            })
        })
    })
    res.send('A token has been sent to your Email Address')
});