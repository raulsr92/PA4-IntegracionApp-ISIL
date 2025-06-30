import {CorsOptions} from "cors"


export const corsConfig: CorsOptions ={
    //origin: de donde se está enviando la petición
    origin: function(origin, callback){

        if(origin == "http://localhost:5173"){
            console.log("Permitir conexión")
            callback(null,true)
        }else{
            console.log("Denegar la conexión")
            callback(new Error("Error de CORS"))
        }
    }
}