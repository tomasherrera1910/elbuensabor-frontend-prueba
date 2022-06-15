import {useState, useEffect} from 'react'
import handlerChangeForm from '../../../utils/handlers/handlerChangeForm'
import getImgBase64 from '../../../utils/getImgBase64'
import { postArticulosManufacturados, putArticuloManufacturado } from '../../../utils/articulosManufacturados'

import styles from '../../../styles/admin.module.css'
const {select} = styles

const INITIAL_STATE={
    rubro: 'pizza',
    denominacion: '',
    precioVenta:'',
    imagen: '',
    tiempoEstimadoCocina: ''
}
export default function FormArticuloManufacturado({token, setModal, articulo, edit, setEdit}){
    const [articuloForm, setArticuloForm] = useState(INITIAL_STATE)
    const [articuloEdit, setArticuloEdit] = useState(false)
    const titulo = edit ? 'Editar Plato'
                        : 'Nuevo Plato'
    const botonSubmit = edit ? 'Guardar Cambios'
                             : 'Agregar Plato'
    useEffect(() => {
        if(edit && !articuloEdit){
        setArticuloForm({...articulo, imagen:''})
        setArticuloEdit(true)
        }
    },[edit,articulo, articuloEdit])
    const handlerImage = async(e) => {
        const img = await getImgBase64(e.target.files[0]) || null
        setArticuloForm({
        ...articuloForm,
        imagen: img
        })
    }
    const handlerManufacturado = e => {
        handlerChangeForm(e, setArticuloForm, articuloForm)
    }
    const formManufacturadoSubmit = (evt) => {
        evt.preventDefault()
        if(edit && articuloEdit){
            putArticuloManufacturado(articulo.id, token, articuloForm)
        }else{
            postArticulosManufacturados(articuloForm, token)
            .then(() => setArticuloForm(INITIAL_STATE))  
        }
        setModal(false)
        setArticuloEdit(false)
        edit && setEdit(!edit)
    }
    return(
        <form onSubmit={formManufacturadoSubmit}>
            <h1>{titulo}</h1>
            <label>Rubro:<select className={select} name='rubro' onChange={handlerManufacturado} defaultValue={articulo?.rubro ?? articuloForm['rubro']}>
                <option value='pizza'>Pizzas</option>
                <option value='empanada'>Empanadas</option>
                <option value='lomo'>Lomos</option>
                <option value='hamburguesa'>Hambuguesas</option>
                <option value='otro'>Otro</option>
                </select></label>
            <label>Denominación:<input type='text' name='denominacion' placeholder='Nombre del plato...' onChange={handlerManufacturado} value={articuloForm['denominacion']}></input></label>
            <label>Precio venta:<input type='number' name='precioVenta' placeholder='Precio de venta...' onChange={handlerManufacturado} value={articuloForm['precioVenta']}></input></label>
            <label>Imagen:<input type='file' className={select} name='imagen' id='imagen' onChange={handlerImage}></input></label>
            <label>Tiempo estimado de cocina (minutos):<input type='number' name='tiempoEstimadoCocina' placeholder='Tiempo de cocina...' onChange={handlerManufacturado} value={articuloForm['tiempoEstimadoCocina']}></input></label>
            <button>{botonSubmit}</button>
        </form>
    )
}