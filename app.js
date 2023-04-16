const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const express = require('express');
const app = express()

dotenv.config({path:'./config.env'});
const Port = process.env.PORT;

require('./db/conn');

// app.use(express.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app.use(cookieParser())
app.use(require('./router/auth'));


if(process.env.NODE_ENV == 'production'){
    const path=require('path');
    app.get('/',(req,res)=>{
        app.use(express.static(path.resolve(__dirname,'client','build')));
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}


// const middleWare = (req,res,next)=>{
//     console.log("Hello middleWare");
//     next();
// }


// app.get('/about', middleWare, (req, res)=> {
//     res.send('Hello World from about')
// });

// app.get('/contact', (req, res)=> {
//     res.cookie('test','testing');
//     res.send('Hello World from contact')
// });

// app.get('/signin', (req, res)=> {
//     res.send('Hello signing in World')
// });

// app.get('/signup', (req, res)=> {
//     res.send('Hello World signup')
// });

app.listen(Port)