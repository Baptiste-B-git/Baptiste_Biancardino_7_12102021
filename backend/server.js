// Imports
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const app = express();
const db = require('./models');
const cors = require('cors');
const path = require("path");
app.use(cors()) 

// Body Parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Configure routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

// Récupération des images dans le dossier images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Launch server En ecoutant le PORT, décoche un call back qui est le port 5000
app.listen(process.env.PORT, () => {
    console.log('Listening on port 5000');
})