const express= require('express');

const router= express.Router();
const db =require('../model/db_controller')
module.exports = router;
 
router.use(express.urlencoded({extended: true}));
router.use(express.json());

router.get('/',function(req,res){
res.render('verify.hbs')
})


router.post('/',function(req,res){
    const id = req.body.id;
    const token = req.body.token;
     db.matchtoken(id,token,function(err,result){
         console.log(result)
         if(result.length > 0 ){
             var email= result[0].email;
             const email_status= 'verified';
             db.updateverify(email,email_status,function(err,result){
                 res.send('Email Verified')
             })
         }else{
             res.send('Token is not Verified')
         }
     })
})