import {Router} from 'express'
import {body} from "express-validator" // permite validar el req.body
//import User from './models/User'
import {createAccount, login} from "./handlers/index"
import { handleInputErrors } from './middleware/validation'

// Permite configurar un objeto con todas las rutas que despues podemos agregar a la app principal server.ts

const router = Router()

// Routing

router.post('/auth/register',
    body("handle").notEmpty().withMessage("El handle no puede estar vacío"),
    body("name").notEmpty().withMessage("El nombre no puede estar vacío"),
    body("email").isEmail().withMessage("Email no válido"),
    body("password").isLength({min: 8}).withMessage("El password es muy corto, mínimo se piden 8 caracteres"),
    handleInputErrors
    ,createAccount)

router.post('/auth/login',
    body("email").isEmail().withMessage("Email no válido"),
    body("password").isLength({min: 8}).withMessage("El password es muy corto, mínimo se piden 8 caracteres"),
    login
)
/*
router.get('/', (req, res)=>{
    res.send('Hola Mundo en Express')
}) //request ( envía información, url que se está visitando - response (la información que regresa)

router.get('/nosotros', (req, res)=>{
    res.send('Este es el Ecommerce')
}) //request ( envía información, url que se está visitando - response (la información que regresa)

router.get('/blog', (req, res)=>{
    res.send('Este es el Ecommerce')
}) //request ( envía información, url que se está visitando - response (la información que regresa)
*/

export default router