import {Link} from "react-router-dom"

export default function LoginView() {
    return(
        <>
            <div>
                <img className="w-60" src="/logo.svg" alt="logo" />
            </div>
            <div className="text-6xl bg-sky-300">
                LoginView
                <h5>De Raul Sanchez</h5>
            </div>
            <nav>
                ¿No tienes una cuenta?
                <Link className="text-rose-300 hover:text-violet-600 dark:text-white" to="/auth/register">
                    Crea una cuenta aquí
                </Link>
            </nav>

        </>
        

        
        
    )
}