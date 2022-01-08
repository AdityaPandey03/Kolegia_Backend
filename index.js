const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

require('dotenv').config();

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const mongodb_uri = process.env.NODE_ENV ? process.env.MONGODB_URI : "mongodb+srv://cluster0.nbslt.mongodb.net/Kolegia";

mongoose.connect(mongodb_uri, {useNewUrlParser:true})
    .catch(err => console.error(err));

const port = process.env.NODE_ENV ? process.env.PORT : 8000;

app.listen(process.env.PORT || 8000);

console.log(`Listening to port ${port}`);

