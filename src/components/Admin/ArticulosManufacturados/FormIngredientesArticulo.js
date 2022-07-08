import { useState, useEffect } from 'react'
import { getArticulosInsumo, getOneArticuloInsumo } from '../../../utils/articulosInsumo'
import { postArticuloDetalle, deleteArticuloDetalle, getOneArticuloManufacturado } from '../../../utils/articulosManufacturados'
import handlerChangeForm from '../../../utils/handlers/handlerChangeForm'

import Spinner from '../../Spinner'
import styles from '../../../styles/admin.module.css'
const {select, buttonFilter} = styles
const INGREDIENTES_STATE={
    articuloInsumo: '',
    cantidad: ''
}
export default function FormIngredientesArticulo({ingredientes, id, token}){
    const [ingredientesInsumo, setIngredientesInsumo] = useState([])
    const [ingredientesForm, setIngredientesForm] = useState(INGREDIENTES_STATE)
    const [unidadMedida, setUnidadMedida] = useState(undefined)
    const [idIngrediente, setIdIngrediente] = useState(null)
    const [articulo, setArticulo] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getOneArticuloManufacturado(id)
        .then(setArticulo)
        .finally(() => setLoading(false))
    },[id])

    useEffect(() => {
        getArticulosInsumo()
        .then(data => setIngredientesInsumo(data.filter(articulo => articulo.baja === false && articulo.rubro === 'ingredientes')))
    },[ingredientes])
    useEffect(() => {
        if(idIngrediente){
            getOneArticuloInsumo(idIngrediente)
            .then(setUnidadMedida)
        }
    },[idIngrediente])

    const handlerIngredientes = e => {
        handlerChangeForm(e, setIngredientesForm, ingredientesForm)
    }
    const handlerArticuloInsumo = e => {
        setIdIngrediente(e.target.value)
        handlerChangeForm(e, setIngredientesForm, ingredientesForm)
    }
    const ingredienteSubmit = e => {
        e.preventDefault()
        postArticuloDetalle(id, token, ingredientesForm)
        .then(() => setIngredientesForm(INGREDIENTES_STATE))
        .then(() => {
            setLoading(true)
            getOneArticuloManufacturado(id)
            .then(setArticulo)
            .finally(() => setLoading(false))
        })
    }

    const deleteIngredienteHandler = ingredienteId => {
        deleteArticuloDetalle(token, ingredienteId)
        .then(() => {
            setLoading(true)
            getOneArticuloManufacturado(id)
            .then(setArticulo)
            .finally(() => setLoading(false))
        })
    }
    return(
        <article>
         <h2>Ingredientes:</h2>
                {loading ? <Spinner/>
                         :
                            <ul>
                            {articulo.ingredientes?.map(ingrediente => (
                                <li key={ingrediente.id}>{ingrediente.nombre}: {ingrediente.cantidad}{ingrediente.unidadMedida}
                                <button onClick={() => deleteIngredienteHandler(ingrediente.id)}>🗑</button>
                                </li>
                            ))}
                            </ul>
                }
            <form onSubmit={ingredienteSubmit}>
                <select className={select} name='articuloInsumo' onChange={handlerArticuloInsumo} defaultValue={ingredientesForm['articuloInsumo']}>
                        <option value=''>-Ingrediente-</option>
                    {ingredientesInsumo.map(ingrediente => (
                        <option key={ingrediente.id} value={ingrediente.id}>{ingrediente.denominacion}</option>
                    ))}
                </select>
                <input type='number' placeholder='Cantidad' name='cantidad' onChange={handlerIngredientes} value={ingredientesForm['cantidad']}/>{unidadMedida?.unidadMedida}
                <button className={buttonFilter}>Agregar ingrediente</button>
            </form>
        </article>
    )
}