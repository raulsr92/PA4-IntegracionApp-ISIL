import {Link} from "react-router-dom"
import {useForm} from "react-hook-form"
import ErrorMessage from "../../components/ErrorMessage"
import type { LoginForm } from "../types"
import api from "../config/axios"
import {toast} from "sonner"
import  {isAxiosError} from "axios"



export default function LoginView() {
    const initialValues: LoginForm ={
        email: "",
        password: "",
    }

    //Reglas de validación y mostrar errores
    const { register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues})

    const handleLogin = async(formData:LoginForm) =>{
        console.log(formData)
        try {
            const {data} = await api.post(`/auth/login`, formData)
            // console.log(data)
            // toast.success(data)
            localStorage.setItem("AUTH_TOKEN", data)
            
        } catch (error) {
            // console.log(error)
            if (isAxiosError(error) && error.response) {
                toast.error(error.response?.data.error)
            }
           
        }
    }



    return(
        <>
            <h1 className="text-center text-4xl text-white font-bold">Iniciar Sesión</h1>

            <form 
                onSubmit={handleSubmit(handleLogin)}
                className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10 max-w-md mx-auto"
                noValidate
                >
  
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
                    <input 
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('email',{
                                required: "El email es obligatorio",
                                pattern:{
                                    value: /\S+@\S+\.\S+/,
                                    message: "E-mail no válido"
                                }
                            })
                        }
                    />
                    {errors.email && (
                        <ErrorMessage>
                            {errors.email.message}
                        </ErrorMessage>
                    )}
                </div> 

   
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
                    <input 
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('password',{
                                required: "El password es obligatorio",
                            })
                        }
                    />
                    {errors.password && (
                        <ErrorMessage>
                            {errors.password.message}
                        </ErrorMessage>
                    )}
                </div>


                <input 
                    type="submit"
                    className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer" 
                    value="Iniciar Sesión"
                />                                 
            </form>


            <nav className="mt-10 flex gap-x-4 justify-center ">
                <span className="text-lg text-white ">
                    ¿No tienes una cuenta?
                </span>
                <Link className="text-center text-lg block text-rose-300 hover:text-green-300 dark:text-white" to="/auth/register">
                    Crea una cuenta aquí
                </Link>
            </nav>

        </>
    )
}