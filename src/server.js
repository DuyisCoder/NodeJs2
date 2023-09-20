// const express = require('express')
import express from "express"
import configViewEngine from './config/configViewEngine';
import initRoutes from './routes/webRoute'
import connection from './config/database'
require('dotenv').config()

const app = express();

const port = process.env.PORT || 3000
// config view Engine EJS
configViewEngine(app);

// config routes
initRoutes(app)



app.listen(port, () => {
    console.log("server is running!");
})