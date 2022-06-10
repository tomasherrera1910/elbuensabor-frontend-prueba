import {useState} from 'react'
import handlerChangeForm from '../../../utils/handlers/handlerChangeForm'
import getImgBase64 from '../../../utils/getImgBase64'
import { postArticulosManufacturados } from '../../../utils/articulosManufacturados'

import styles from '../../../styles/admin.module.css'
const {select} = styles

const INITIAL_STATE={
    rubro: 'pizza',
    denominacion: '',
    precioVenta:'',
    imagen: '',
    tiempoEstimadoCocina: ''
}
export default function FormArticuloManufacturado({token, setModal}){
    const [articuloForm, setArticuloForm] = useState(INITIAL_STATE)
    
    const handlerImage = async(e) => {
        const img = e.target?.files[0] ? await getImgBase64()
                                              : null
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
        console.log(articuloForm)
        postArticulosManufacturados(articuloForm, token)
        .then(() => setArticuloForm(INITIAL_STATE))  
        setModal(false)  
    }
    return(
        <form onSubmit={formManufacturadoSubmit}>
            <h1>Nuevo Plato</h1>
            <label>Rubro:<select className={select} name='rubro' onChange={handlerManufacturado} defaultValue={articuloForm['rubro']}>
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
            <button>Agregar Plato</button>
        </form>
    )
}