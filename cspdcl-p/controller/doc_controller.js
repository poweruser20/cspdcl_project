const express= require('express');
const router= express.Router();
const bodyParser= require('body-parser')
const multer = require('multer')

const db = require('../model/db_controller')
const fs = require('fs');
const path = require('path');


router.get('*',function(re,res,next){
    if(req.cookies['username'==null]){
        res.redirect('/login')
    }
    else{
        next();
    }
})

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./public/assets/images')
    },
    filename: function(req,file,cb){
        console.log(file)
        cb(null,file.originalname)
    }
});

const upload = multer({storage:storage})

router.get('/',function(req,res){
    if(err) throw err
    res.render('doctor.hbs',{list:result})
});
 

router.use(express.urlencoded({extended: true}));
router.use(express.json());

router.get('/add_doctor',function(req,res){
    db.getallDept(function(err,result){
     res.render('add_doctor.hbs',{list:result})
    })
});

router.post('/add_doctor',upload.single('image'),function(req,res){
    db.add_doctor(req.body.first_name,req.body.last_name,req.body.email,req.body.dob,req.body.gender
                ,req.body.address,req.body.phone,req.file.filename,req.body.department,req.body.biography)
    if(db.add_doctor){
        console.log('1 doctor inserted')
    }
    res.render('add_doctor')
})

router.get('/edit_doctor/:id',function(req,res){
    const id = req.params.id;
    db.getDocbyId(id,function(err,result){
        res.render('edit_doctor.hbs',{list:result})
    })
})

router.post('/edit_doctor/:id',function(req,res){
    const id = req.params.id;
    db.editDoc(req.body.first_name,req.body.last_name,req.body.email,req.body.dob,req.body.gender
                    ,req.body.address,req.body.phone,req.file.filename,req.body.department,req.body.biography),
    function(error,result){
        if(error) throw err;
        res.redirect('back')
}

})

router.get('/delete_doctor/:id',function(req,res){
    const id = req.params.id;
    db.getDocbyId(id,function(err,result){
        res.redirect('delete_doctor.hbs')
    })
})
router.post('/delete_doctor/:id',function(req,res){
    const id = req.params.id;
    db.deleteDoc(id,function(err,result){
        res.redirect('doctor')
    })

})
router.get('/',function(req,res){
    db.getAllDoc(function(err,result){
    if (err) throw err;
    res.render('doctor.hbs',{list:result})
    }) 
})

router.post('/search',function(req,res){
    const key = req.body.search;
    db.searchDoc(key,function(err,result){
        console.log(result);
        res.render('doctor.hbs',{list:result})
    })
})

module.exports = router;