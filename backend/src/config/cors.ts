import {CorsOptions} from "cors"


export const corsConfig: CorsOptions ={
    //origin: de donde se está enviando la petición
    origin: function(origin, callback){

        if(origin == process.env.FRONTEND_URL){
            console.log("Permitir conexión")
            callback(null,true)
        }else{
            console.log("Denegar la conexión")
            callback(new Error("Error de CORS"))
        }
    }
}