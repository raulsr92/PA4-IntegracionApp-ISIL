
import bcrypt from "bcrypt"

export const hashPassword = async (password: string)=>{
    console.log(password)


    /* Clase 09/06/25 */

    const salt = await bcrypt.genSalt(10)

    return await bcrypt.hash(password,salt)
}

//Funcion para comprobar el password

export const checkPassword = async(enteredPassword: string, hash: string) =>{

    return await bcrypt.compare(enteredPassword,hash)

    console.log(enteredPassword)
        console.log(hash)

}