import {Link} from "react-router-dom"

export default function LoginView() {
    return(
        <>
            <h1 className="text-center text-4xl text-white font-bold">Iniciar Sesión</h1>
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