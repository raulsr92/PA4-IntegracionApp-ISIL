import {Link} from "react-router-dom"
import {useForm} from "react-hook-form"
import  {isAxiosError} from "axios"
import {toast} from "sonner"
import type { RegisterForm } from "../types"
import ErrorMessage from "../../components/ErrorMessage"
import api from "../config/axios"

export default function RegisterView() {

    //toast("Hola mundo desde Toast")

    const initialValues: RegisterForm ={
        name: "",
        email: "",
        handle: "",
        password: "",
        password_confirmation: "",
    }
    //Reglas de validación y mostrar errores
    const { register, watch,reset, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues})

    // console.log(errors)

    const password = watch("password")

    console.log(import.meta.env.VITE_API_URL)

    const handleRegister = async(formData: RegisterForm) =>{
        console.log(formData)
        try {
            const {data} = await api.post(`/auth/register`, formData)
            console.log(data)
            toast.success(data)
            reset()
            
        } catch (error) {
            console.log(error)
            if (isAxiosError(error) && error.response) {
                toast.error(error.response?.data.error)
            }
           
        }
    }

    return(
        <>
            <h1 className="text-center text-4xl text-white font-bold">Crear cuenta</h1>

            <form 
                onSubmit={handleSubmit(handleRegister)}
                className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10 max-w-md mx-auto">
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="name" className="text-2xl text-slate-500">Nombre</label>
                    <input 
                        id="name"
                        type="text"
                        placeholder="Nombre"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('name',{
                                required: "El nombre es obligatorio"
                            })
                        }
                    />
                    {errors.name && (
                        <ErrorMessage>
                            {errors.name.message}
                        </ErrorMessage>
                    )}
                </div>   
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
                    <label htmlFor="handle" className="text-2xl text-slate-500">Handle</label>
                    <input 
                        id="handle"
                        type="text"
                        placeholder="Nombre de usuario: sin espacios"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('handle',{
                                required: "El handle es obligatorio"
                            })
                        }
                    />
                    {errors.handle && (
                        <ErrorMessage>
                            {errors.handle.message}
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
                                minLength:{
                                    value:8,
                                    message: "El password debe ser mínimo de 8 caracteres"
                                }
                            })
                        }
                    />
                    {errors.password && (
                        <ErrorMessage>
                            {errors.password.message}
                        </ErrorMessage>
                    )}
                </div>
                    <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password_confirmation" className="text-2xl text-slate-500">Repetir Password</label>
                    <input 
                        id="password_confirmation"
                        type="password"
                        placeholder="Repetir Password"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('password_confirmation',{
                                required: "El password es obligatorio",
                                validate: (value) => value ==password  || "Los password no son iguales" 
                            })
                        }
                    />
                    {errors.password_confirmation && (
                        <ErrorMessage>
                            {errors.password_confirmation.message}
                        </ErrorMessage>
                    )}
                </div>   

                <input 
                    type="submit"
                    className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer" 
                    value="Crear Cuenta"
                />                                 
            </form>

            <nav className="mt-10 flex gap-x-4 justify-center ">
                <span className="text-lg text-white ">
                    ¿Ya tienes una cuenta?
                </span>
                <Link className="text-center text-lg block text-rose-300 hover:text-green-300 dark:text-white" to="/auth/login">
                    Inicia sesión
                </Link>
            </nav>
        </>
        
    )
}