// const express = require('express')
import express from "express"
import configViewEngine from './config/configViewEngine';
import initRoutes from './routes/webRoute'
import connection from './config/database'
import bodyParser from 'body-parser'
import initAPI from "./routes/api";
require('dotenv').config()
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const port = process.env.PORT || 3000
// config view Engine EJS
configViewEngine(app);

// config routes
initRoutes(app)
//config api
initAPI(app);

app.listen(port, () => {
    console.log("server is running!");
})