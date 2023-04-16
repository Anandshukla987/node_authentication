const mongoose = require('mongoose');

const db = process.env.DATABASE;

mongoose.connect(db)
.then(()=>console.log("Connection succesful"))
.catch((err)=>console.log(err));