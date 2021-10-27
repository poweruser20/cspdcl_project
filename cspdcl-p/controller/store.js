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
     db.getAllmed(function(err,result){
         res.render('store.hbs',{list:result})
     })
 })

 router.get('/add_med',function(req,res){
     res.render('add_med.hbs')
 })

 router.post('/add_med',function(req,res){
     const name = req.body.name;
     const p_date = req.body.p_date;
     const expiry = req.body.expiry;
     const e_date = req.body.edate;
     const price = req.body.price;
     const quantity = req.body.quantity;

     db.addMed(name,p_date,expiry,e_date,price,quantity,function(err,result){
         res.redirect('/store')
     })
 });

 router.get('/edit_med/:id',function(req,res){
     const id = req.params.id;
     db.getMedbyId(id, function(err,result){
     res.render('edit_med.hbs',{list:result})
     });
 });
 
 router.post('/edit_med/:id',function(req,res){
     const id = req.params.id;
     const name = req.body.name;
     const p_date = req.body.p_date;
     const expiry = req.body.expiry;
     const e_date = req.body.edate;
     const price = req.body.price;
     const quantity = req.body.quantity;

     db.editMed(id,name,p_date,expiry,e_date,price,quantity,function(err,result){
         res.redirect('/store')
     })
     
 })

 router.get('/delete_med/:id',function(req,res){
     const id = req.params.id;
     db.getMedbyId(id,function(err,result){
         res.render('delete_med.hbs',{list:result})
     })
 });

 router.post('/delete_med/:id',function(req,res){
     const id = req.params.id;
     db.deleteMed(id,function(err,result){
         res.redirect('/store')
     })
 });

 router.post('/search',function(req,res){
     const key = req.body.search;
 db.searchMed(key,function(err,result){
     console.log(result);
     res.render('store.hbs',{list:result})
 })
 });