import mongoose, {Schema} from "mongoose";

interface IUser{
    handle:String
    name:String
    email:String
    password:string
}


const userSchema = new Schema({
    //Atributos

    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase: true,
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    handle:{
        type:String,
        required:true,
        trim:true,
        lowercase: true,
        unique: true
    }
})

//creamos el modelo

const UserModel = mongoose.model<IUser>("User", userSchema)

export default UserModel