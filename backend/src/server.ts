//const express = require('express') //CJS Common JS
import express from 'express' // ESM ecmascript modules
import "dotenv/config"
import router from './router'
import { connectDB } from './config/db'

// instancia del servidor
const app = express()

connectDB();

app.use(express.json())

//app.get('/', router)
app.use('/', router) //cada que hay une petición a la url principal se ejecuta a router

export default app