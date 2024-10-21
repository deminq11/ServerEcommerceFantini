export const errorProcessor=(res, error, errorType)=>{
    console.error(error)
    res.setHeader('Content-Type','application/json')
    if(errorType == "validation"){
        return res.status(400).json(
            {
                error:`Error en la validación de atributos`,
                detalle: error|| "Hubo un error en la validación."
            }
        )
    }
    if(errorType == "server"){
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor`,
                detalle: error.message ||error||"Intente más tarde, o contacte al administrador"
            }
        )
    }
    return res.status(400).json(
        {
            error:`Error`,
            detalle: error?.message||error||"Hubo un error inesperado..."
        }
    )
}