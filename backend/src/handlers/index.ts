
import {Request,Response} from "express"
import { validationResult } from "express-validator"
import User from '../models/User'
/* Clase 09/06/25 */
import { checkPassword, hashPassword } from "../utils/auth"
import slug from "slug"
import { generateJWT } from "../utils/jwt"


export const createAccount = async(req:Request, res:Response)=>{
    console.log(req.body)

    //Manejar errores
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()})
    }

    const {email, password} = req.body

    const userExists = await User.findOne({email})

    if(userExists){
        const error = new Error("El usuario ya está registrado")
        
        return res.status(409).json({error:error.message})
        console.log("Si existe")
    }else{
        console.log("No existe")
    }

    const handle = slug(req.body.handle, "")

    const handleExists = await User.findOne({handle})

    if(handleExists){
        const error = new Error("Nombre de usuario no disponible")
        
        return res.status(409).json({error:error.message})
    }else{
        console.log("No existe")
    }


    //Otra forma de agregar datos es instanciar el modelo
    const user = new User(req.body)

    /*
    const hash = await hashPassword(password)
    console.log(hash)
    */

    user.password = await hashPassword(password)
    user.handle = handle

    console.log(slug(handle, ""))

     await user.save()

     res.status(201).send("Registro creado exitosamente")
    }


export const login = async(req:Request, res:Response)=>{

    const {email, password} = req.body

    const user = await User.findOne({email})

    if(!user){
        const error = new Error("El usuario no existe")
        
        return res.status(409).json({error:error.message})
    }

    console.log("El usuario si existe")
    console.log(password)
    console.log(user.password)

    // 1235678 = ajkdjakjkjfajfjafd()!="!"

    //Comprobar el password

    const isPasswordCorrect = await checkPassword(password,user.password)
    if(!isPasswordCorrect){
        const error = new Error ("Pasword Incorrecto")
        return res.status(401).json({error: error.message})
    }

    const token = generateJWT({id: user._id})
    res.send(token)

}