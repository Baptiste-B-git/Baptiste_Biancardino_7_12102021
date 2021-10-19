const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const app = express();
const db = require('./models');
db.User.findAll().then(res =>{
    console.log (res)
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



// routes
app.use('/api/user', userRoutes);



// server
app.listen(process.env.PORT, () => {
    console.log('Listening on port 5000');
})