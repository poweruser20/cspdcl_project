const express= require('express');
const router= express.Router();
const bodyParser= require('body-parser')
const { check, validationResult } = require('express-validator');

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
    db.getAllappointment(function(err,result){
        console.log(result)
        res.render('appointment.hbs',{list:result})
    })
});

router.get('/',function(req,res){
 res.render('add_appointmet.hbs')
});

router.post('/add_appointment',function(req,res){
    db.add_appointment(req.body.p_name.req.body.department,req.body.d_name,req.body.date,req.body.time,req.body.email,req.body.phone,function(err,result){
        res.redirect('/appointment')
    })
});

router.get('/edit_appointment/:id',function(req,res){
    const id = req.params.id;
    db.getAllappointmentById(id,function(err,result){
        console.log(result);
        res.render('edit_appointmnet.hbs',{list:result})
    })
});


router.post('/edit_appointment/:id',function(req,res){
    const id = req.params.id
    db.editappointment(req.body.p_name.req.body.department,req.body.d_name,req.body.date,req.body.time,req.body.email,req.body.phone,function(err,result){
        res.redirect('/appointment')
    })
});


router.get('/delete_appointment/:id',function(req,res){
    const id = req.params.id;
    db.getAllappointmentById(id,function(err,results){
        console.log(results);
        res.render('delete_appointment.hbs',{list:result})
    })
})

router.post('/delete_appointment/:id',function(req,res){
    const id = req.params.id;
    db.deleteappointmnet(id,function(err,result){
        res.redirect('/appointment')
    })
})

