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
    db.getallEmp(function(err,result) {
        res.render('salary.hbs',{employee:result})
    })
});

router.get('/generateSlip/:id',function(req,res){
    const id = req.params.id;
    db.getEmpbyId(id,function(err,result){
        const name = result[0].name;
        const id = result[0].id;
        const email = result[0].email;
        const role = result[0].role;
        const join_date = result[0].join_date;
        const contact = result[0].contact;
        res.render('payslip.hbs',{name:name,id:id,email:email,role:role,join_date:join_date,contact:contact})
        ;
    })
})