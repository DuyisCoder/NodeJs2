// const express = require('express')
import express from "express"
import configViewEngine from './config/configViewEngine';
import initRoutes from './routes/webRoute'
import bodyParser from 'body-parser'
import initAPI from "./routes/api";
require('dotenv').config()
var morgan = require('morgan')
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('combined'))
// parse application/json
app.use(bodyParser.json())
app.use((req, res, next) => {
    // Kiểm tra nếu req ko hợp lệ thì return 
    console.log("Check middleware:");
    console.log(req.method);
    //  Kt nếu hợp lệ -> next()-> đc hổ trợ trong middleware
    next();
})
const port = process.env.PORT || 3000
// config view Engine EJS
configViewEngine(app);

// config routes
initRoutes(app)
//config api
initAPI(app);

//handle 404 not found : phải đặt dưới cuối để mấy link khác không bị not found
app.use((req, res) => {
    res.render('404.ejs');
})
app.listen(port, () => {
    console.log("server is running!");
})