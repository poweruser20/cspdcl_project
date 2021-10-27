const express= require('express');
const router= express.Router();
const bodyParser= require('body-parser');

module.exports= router;

const db = require('../model/db_controller')


router.get('*',function(req,res,next){
    if(req.cookies['username'==null]){
        res.redirect('/login')
    }
    else{
        next();
    }
})

router.get('/',function(req,res){
    res.render('complain.hbs')
})

router.post('/',function(req,res){
    const message = req.body.message;
    const name = req.body.name;
    const email = req.body.email;
    const subject= req.body.subject;
    db.postComplain(message,name,email,subject,function(err,result){
        res.redirect('back')
    })
})
