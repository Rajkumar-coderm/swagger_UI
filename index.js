const express=require('express');
var bodyParser = require('body-parser')
const knex=require('./databases/db')
const app=express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',require('./Router/crud'))

app.listen(2021,()=>{
    console.log("server start");
})