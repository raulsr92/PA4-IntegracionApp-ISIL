type ErrorMessagePops = {
    children: React.ReactNode
}

export default function ErroreMessage({children}:ErrorMessagePops){
    return(

        <p className="p-3 uppercase text-sm font-bold text-center bg-red-50 text-red-600 ">
            {children}
        </p>
    )
}