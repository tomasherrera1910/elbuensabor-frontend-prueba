import {useState, useEffect} from 'react'
import { getOneArticuloManufacturado } from '../../utils/articulosManufacturados'
import Spinner from '../Spinner'
export default function CocinaIngredientesCard({detalle, display}){
    const [manufacturado, setManufacturado] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getOneArticuloManufacturado(detalle.articuloId)
        .then(setManufacturado)
        .finally(() => setLoading(false))
    },[detalle.articuloId])
    return(
        <>
        {loading
        ?
        <Spinner/>
        :
        <>
        {manufacturado.ingredientes?.map(ingrediente => (
                <div key={ingrediente.id} style={display}>
                    <p>{ingrediente.nombre}: {ingrediente.cantidad} {ingrediente.unidadMedida}</p>
                </div>
        ))}
        </>
        }
        </>
    )
}