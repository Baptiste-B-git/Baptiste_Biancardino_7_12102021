const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const app = express();
const db = require('./models');
const cors = require('cors');
app.use(cors()) 


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);


// server
app.listen(process.env.PORT, () => {
    console.log('Listening on port 5000');
})