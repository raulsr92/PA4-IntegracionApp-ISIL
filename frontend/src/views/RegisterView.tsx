import {Link} from "react-router-dom"

export default function RegisterView() {
    return(

        <>
            <div className="text-6xl ">
                RegisterView
                <h3 className="text-gray-600">De Raul Sanchez</h3>
            </div>
            <nav>
                ¿Ya tienes una cuenta?
                <Link className="text-gray-600" to="/auth/login">
                    Inicia sesión
                </Link>
            </nav>

        </>
        
    )
}