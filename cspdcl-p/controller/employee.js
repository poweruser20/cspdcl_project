const express= require('express');
const router= express.Router();
const bodyParser= require('body-parser')
const { check, validationResult } = require('express-validator');

module.exports= router;

const db = require('../model/db_controller')


router.get('*',function(re,res,next){
    if(req.cookies['username'==null]){
        res.redirect('/login')
    }
    else{
        next();
    }
})

router.get('/',function(res,req,next){
 db.getallEmployee(function(err,result){
     res.render('employee.hbs',{employee:result})
 })
});

router.get('/add',function(req,res){
    res.render('add_employee.hbs')
})

router.post('/add',function(req,res){
    const name = req.body.name;
    const email = req.body.email;
    const contact = req.body.contact;
    const join_date = req.body.join_date;
    const role = req.body.role;
    const salary = req.body.salary;
    db.add_employee(name,email,contact,join_date,role,salary,function(err,result){
        console.log('employee details are added to database');
        res.redirect('/employee');

    })
});

router.get('/leave',function(req,res){
    db.getAllLeave(function(err,result){
        res.render('leave.hbs',{user:result})
    })
});

router.get('add_leave',function(req,res){
    res.render('add_leave.hbs')
});

router.get('/edit_leave/:id',function(req,res){
    const id =request.params.id
    db.getleavebyId(id,function(err,result){
        res.render('edit_leave.hbs',{user:result})
    })
});

router.post('/edit_leave/:id',function(req,res){
    const id = req.params.id;
    db.edit_leave(id,req.body.name,req.body.leave_type,req.body.from,req.body.to,req.body.reason,function(err,result){
        res.redirect('/employee/leave')
    })
});

router.get('/delete_leave/:id',function(req,res){
    const id = req.params.id;
    db.getleavebyId(id,function(err,result){
        res.render('delete_leave.hbs',{user:result})
    })
});

router.post('/delete_leave/:id',function(req,res){
    const id = req.params.id;
    db.deleteleave(id,function(err,result){
        res.redirect('/employee/leave')
    })
});

router.get('/edit_employee/:id',function(req,res){
    const id =request.params.id
    db.getEmpbyId(id,function(err,result){
        res.render('edit_employee.hbs',{list:result})
    })
});

router.post('/edit_employee/:id',function(req,res){
    const id = req.params.id
    const name = req.body.name;
    const email = req.body.email;
    const contact = req.body.contact;
    const join_date = req.body.join_date;
    const role = req.body.role;
    const salary = req.body.salary;
    db.editEmp(name,email,contact,join_date,role,salary,function(err,result){
        console.log('employee details edited');
        res.redirect('/employee');

    })
});


router.get('/delete_employee/:id',function(req,res){
    const id = req.params.id;
    db.deleteleave(id,function(err,result){
        res.render('delete_employee.hbs',{list:result})
    })
});

router.post('/delete_employee/:id',function(req,res){
    const id = req.params.id;
    db.deleteEmp(id,function(err,result){
        res.redirect('/employee')
    })
});



router.post('/search',function(req,res){
    const key = req.body.search;
    db.searchEmp(key,function(err,result){
        console.log(result);
        res.render('employee.hbs',{employee:result})
    })
})


router.post('/add_leave',[
    check('name').notEmpty(),
    check('id').notEmpty(),
    check('leave_type').notEmpty(),
    check('from').notEmpty().withMessage('select a date'),
    check('to').notEmpty().withMessage('select a date'),
    check('reason').notEmpty().withMessage('specify a reason')],
    function(req,res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors:errors.array()})
        }
        
    const id = req.params.id
    const name = req.body.name;
    const email = req.body.email;
    const contact = req.body.contact;
    const join_date = req.body.join_date;
    const role = req.body.role;
    const salary = req.body.salary;
    db.add_leave(name,email,contact,join_date,role,salary,function(err,results){
        res.redirect('/employee/leave')
    })
    })
