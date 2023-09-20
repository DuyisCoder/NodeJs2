// const express = require('express')
import express from 'express'
import configViewEngine from './config/configViewEngine';
require('dotenv').config()


const app = express();

const port = process.env.PORT
configViewEngine(app);

app.get('/', (req, res) => {
    res.send('hii');
})
app.get('/view', (req, res) => {
    res.render('index.ejs')
})

app.listen(port, () => {
    console.log("server is running!");
})