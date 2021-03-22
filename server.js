const express = require('express')

require('dotenv').config()
const cors = require('cors') //para que se pueda consumir
const router = require('./routes/index')
require('./config/database')
const app =express()
var path = require('path');
//MIDDLEWARE
app.use(cors()) //evito bloqueos para consumo de api
app.use(express.json()) //formato de archivos


app.use('/api', router) //sila ruta es api, escucha a router q esta en index.js

//Levanto servidor

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname+"/client/build/index.html"))
    })
}

const port = process.env.PORT || 4000
const host = process.env.HOST || '0.0.0.0'

app.listen(port, ()=> console.log('App listening on PORT'+port))