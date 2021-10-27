const express = require('express');
const session = require('express-session');
const cookie = require('cookie-parser');
const path = require('path')
const hbs = require('hbs');
const crypto = require('crypto')
const multer = require('multer')
const async = require('async')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser');
const {check,validationResult} = require('express-validator');

const sweetalert = require('sweetalert2');
const app = express();
const http = require('http')
const port = process.env.PORT||5000;
const server= http.createServer(app)

const db = require('./model/db_controller')
const signup = require('./controller/signup')
const login = require('./controller/login')
const verify = require('./controller/verify')
const reset = require('./controller/reset_controller')
const doctor = require('./controller/doc_controller')
const employee = require('./controller/employee')
const appointment = require('./controller/appointment')
const store = require('./controller/store')
const complain = require('./controller/complain')
const receipt = require('./controller/receipt')
const app = express();

app.set('view-engine','hbs')

app.use(express.static('./public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookie());

app.use('/signup',signup);
app.use('/login',login);
app.use('/verify',verify);
app.use('/reset',reset);
app.use('/doc',doctor);
app.use('/employee',employee);
app.use('/store',store);
app.use('/complain',complain);
app.use('/receipt',receipt);






server.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})