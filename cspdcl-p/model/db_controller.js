const mysql = require('mysql');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { eachLimit } = require('async');

const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'nodejs'
})

connection.connect(function(error){
    if(error) throw error;
    else console.log('connected to database sucessfully')
    })

module.exports.signup = function(username,email,password,status,callback){
    connection.query('SELECT email FROM `users` WHERE `email` =  "'+email+'" ',function(error,result){
        console.log(result[0])
        if(result[0]==undefined){
            const query = 'INSERT INTO `users`(`username`,`email`,`password`,`email_status`) VALUES("'+username+'","'+email+'","'+password+'","'+status+'")'
            connection.query(query,callback)
            console.log(query);  
        }
        else {
            console.log(error);
        }
    })
}

module.exports.verify = function(username,email,token,callback){
    const query = 'INSERT INTO `verify`(`username`,`email`,`token`) VALUES("'+username+'","'+email+'","'+token+'")'
    connection.query(query,callback);
}

module.exports.getuserId = function(email,callback){
    const query = 'SELECT * FROM `verify` WHERE email = "'+email+'" '
    connection.query(query,callback);
}

module.exports.matchtoken = function(id,token,callback){
    const query = 'SELECT * FROM `verify` WHERE token ="'+token+'" AND id= "'+id+'" '
    connection.query(query,callback);
    console.log(query)
}

module.exports.updateverify = function(email,email_status,callback){
    const query = 'UPDATE `users` SET `email_status` = "'+email_status+'" WHERE `email`= "'+email_status+'" '
    connection.query(query,callback);
}

module.exports.findOne = function(email,callback){
    const query = 'SELECT * FROM `users` WHERE email = "'+email_status+'" '
    connection.query(query,callback);
    console.log(query)
}


module.exports.temp = function(id,email,token,callback){
    const query = 'INSERT INTO `temp`(`id`,`email`,`token`)` VALUES ("'+id+'","'+email+'","'+token+'")'
    connection.query(query,callback);
    console.log(query)
}

module.exports.add_doctor = function(first_name,last_name,email,gender,dob,phone,address,image,department,biography,callback){
    const query = 'INSERT INTO `doctors`(`first_name`,`last_name`,`email`,`gender`,`address`,`phone`,`image`,`department`,`biography`)` VALUES ("'+first_name+'","'+last_name+'","'+email+'","'+gender+'","'+address+'","'+dob+'","'+phone+'","'+image+'","'+department+'","'+biography+'")'
    connection.query(query,callback);
    console.log(query)
}

module.exports.getAllDoc = function(callback){
    const query = 'SELECT * FROM `doctor` '
    connection.query(query,callback);
    console.log(query)
}

module.exports.getDocbyId = function(id,callback){
    const query = 'SELECT * FROM `doctor` WHERE id = "'+id+'" '
    connection.query(query,callback);
    console.log(query)
}

module.exports.editDoc = function(first_name,last_name,email,gender,dob,phone,address,image,department,biography,callback){
    const query = 'UPDATE `doctors` SET `first_name`="'+first_name+'",`last_name`="'+last_name+'",`email`="'+email+'",`gender`="'+gender+'",`address`="'+address+'",`phone`="'+phone+'",`image`="'+image+'",`department`="'+department+'",`biography`="'+biography+'"  WHERE id= "'+id+'" '
    connection.query(query,callback);
    console.log(query)
}

module.exports.deleteDoc = function(id,callback){
    const query = 'DELETE FROM `doctor` WHERE id = "'+id+'" '
    connection.query(query,callback);
    console.log(query)
}

module.exports.searchDoc = function(id,callback){
    const query = 'SELECT FROM `doctor` WHERE first_name like = "%'+key+'%" '
    connection.query(query,callback);
    console.log(query)
}
module.exports.getallDept = function(callback){
    const query = 'SELECT * FROM `departments` '
    connection.query(query,callback);
    console.log(query)
}

module.exports.getLeavebyId = function (id,callback){
    const query = 'SELECT * FROM `leaves` WHERE id='+id;
    connection.query(query,callback)
}

module.exports.getAllLeave = function (callback){
    const query = 'SELECT * FROM `leaves`'
    connection.query(query,callback)
}


module.exports.deleteleave = function(id,callback){
    const query = 'DELETE FROM `leaves` WHERE id='+id;
    connection.query(query,callback)
}

module.exports.add_leave = function(name,id,from,type,to,reason,callback){
    const query = 'INSERT INTO `leaves`(`employee`,`emp_id`,`leave_type`,`date_from`,`date_to`,`reason`) VALUES("'+name+'","'+id+'","'+from+'","'+type+'","'+to+'","'+reason+'")'
    console.log(query);
    connection.query(query,callback);
}

module.exports.getallEmp = function (callback){
    const query = 'SELECT * FROM `employee`'
    connection.query(query,callback)
}

module.exports.getEmpbyId = function (id,callback){
    const query = 'SELECT * FROM `employee` WHERE id='+id;
    connection.query(query,callback)
}

module.exports.add_employee = function(name,email,contact,join_date,role,salary,callback){
    const query = 'INSERT INTO `employee`(`name`,`email`,`contact`,`join_date`,`role`,`salary`) VALUES("'+name+'","'+email+'","'+contact+'","'+join_date+'","'+role+'","'+salary+'")'
    console.log(query);
    connection.query(query,callback);
}

module.exports.searchEmp = function(key,callback){
    const query = 'SELECT * FROM employee WHERE name like = "%'+key+'%" '
    connection.query(query,callback);
    console.log(query)
}

module.exports.deleteEmp = function(id,callback){
    const query = 'DELETE * FROM employee where id ='+id;
    connection.query(query,callback);
}

module.exports.editEmp = function(name,email,contact,join_date,role,salary,callback){
    const query = 'UPDATE `employee` SET `name`='+name+',`email`="'+email+'",`contact`="'+contact+'",`join_date`="'+join_date+'",`role`="'+role+'",`salary`="'+salary+'" '
    connection.query(query,callback);
}


module.exports.edit_leave = function(id,name,leave_type,from,to,reason,callback){
    const query = 'UPDATE `leaves` SET `id`="'+id+'",`name`="'+name+'",`leave_type`="'+leave_type+'",`from`="'+from+'",`to`="'+to+'",`reason`="'+reason+'" '
    connection.query(query,callback);
}

module.exports.add_appointment = function(p_name,department,d_name,date,time,email,phone,callback){
    const query = 'INSERT INTO `appointmnet`(patient_name,department,doctor_name,date,time,email,phone) VALUES("'+p_name+'","'+department+'","'+d_name+'","'+date+'","'+time+'","'+email+'","'+phone+'") '
    console.log(query)
    connection.query(query,callback);
}

module.exports.getAllappointment = function(callback){
    const query = 'SELECT * FROM appointment '
    connection.query(query,callback);
}

module.exports.editappointment = function(id,p_name,department,d_name,date,time,email,phone,callback){
    const query = 'UPDATE `appointment` SET `id`='+id+',`p_name`='+p_name+',`department`="'+department+'",`d_name`="'+d_name+'",`date`="'+date+'",`time`="'+time+'",`email`="'+email+'",`phone`="'+phone+'" '
    connection.query(query,callback);
}

module.exports.deleteappointment =function(id,callback){
    const query = 'DELETE FROM appointment WHERE id='+id;
    connection.query(query,callback);
}

module.exports.getAllmed = function(callback){
    const query = 'SELECT * FROM store ORDER BY id DESC'
    console.log(query);
    connection.query(query,callback)
}

module.exports.addMed = function(name,p_date,expiry,e_date,price,quantity,callback){
    const query = 'INSERT INTO `store`(name,package_date,expiry,expiry_end,price,quantity) VALUES("'+name+'","'+p_date+'","'+expiry+'","'+e_date+'","'+price+'","'+quantity+'")  '
    connection.query(query,callback);
}

module.exports.getMedbyId = function(id,callback){
    const query = 'SELECT FROM store WHERE id='+id;
    connection.query(query,callback);
}

module.exports.editMed = function(name,p_date,expiry,e_date,price,quantity,callback){
    const query = 'UPDATE `store` SET name="'+name+'",package_date="'+p_date+'",expiry="'+expiry+'",expiry_end="'+e_date+'",price="'+price+'",quantity="'+quantity+'" WHERE id="'+id+'"  '
    connection.query(query,callback);
}
 
module.exports.deleteMed= function(id,callback){
    const query = 'DELETE FROM store WHERE id ='+id;
    connection.query(query,callback);
}

module.exports.searchMed = function(key,callback){
    const query = 'SELECT * FROM store WHERE name like "'+key+'" '
    connection.query(query,callback);
}


module.exports.postComplain = function(message,name,email,subject,callback){
    const query = 'INSERT INTO `complain`(message,name,email,subject,callback) VALUES("'+message+'","'+name+'","'+email+'","'+subject+'") '
    connection.query(query,callback);
}

module.exports.getComplain = function(callback){
    const query = ' SELECT * FROM complain ';
    connection.query(query,callback);
}