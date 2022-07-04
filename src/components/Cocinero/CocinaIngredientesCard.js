import {useState, useEffect} from 'react'
import { getOneArticuloManufacturado } from '../../utils/articulosManufacturados'

export default function CocinaIngredientesCard({detalle}){
    const [manufacturado, setManufacturado] = useState([])
    useEffect(() => {
        getOneArticuloManufacturado(detalle.articuloId)
        .then(setManufacturado)
    },[detalle.articuloId])
    return(
        <>
        {manufacturado.ingredientes?.map(ingrediente => (
                <div key={ingrediente.id}>
                    <p>{ingrediente.nombre}: {ingrediente.cantidad} {ingrediente.unidadMedida}</p>
                </div>
        ))}
        </>
    )
}