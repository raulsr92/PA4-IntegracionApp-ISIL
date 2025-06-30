//const express = require('express') //CJS Common JS
import express from 'express' // ESM ecmascript modules
import cors from "cors"
import "dotenv/config"
import router from './router'
import { connectDB } from './config/db'
import { corsConfig } from './config/cors'

// instancia del servidor
const app = express()

// Cors: Middleware global
app.use(cors(corsConfig))

connectDB();

app.use(express.json())

//app.get('/', router)
app.use('/', router) //cada que hay une petición a la url principal se ejecuta a router

export default app