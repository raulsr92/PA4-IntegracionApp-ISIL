import type { Request, Response,NextFunction} from "express";
import {validationResult} from "express-validator"

export const handleInputErrors = (req:Request, res:Response, next:NextFunction)=>{
    //midleware tiene acceso a req y res

    //Manejar errores
        let errors = validationResult(req)
        console.log("Desde validation.ts")
        if(!errors.isEmpty()){

            return res.status(400).json({error: errors.array()})

        }
        next()
}