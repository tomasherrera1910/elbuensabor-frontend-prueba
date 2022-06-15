import {useState} from 'react'
import FormIngredientesArticulo from './FormIngredientesArticulo'
import { Modal } from '../../Modal'
import FormArticuloManufacturado from './FormArticuloManufacturado'
import { deleteArticuloManufacturado } from '../../../utils/articulosManufacturados'

import styles from '../../../styles/admin.module.css'
const {cardManufacturados, editButton, deleteButton} = styles

export default function CardArticuloManufacturado({articulo, token}){
    const {imagen, ...articuloSinImagen} = articulo
    const {id, denominacion, precioVenta, ingredientes} = articulo
    const  [edit, setEdit] = useState(false)
    const[modal, setModal] = useState(false)
    const editFormClick = () => {
        setEdit(!edit)
        setModal(!modal)
 }
    return(
        <>
        <div className={cardManufacturados}>
            <img src={imagen} alt={denominacion}/>
            <section>
                <h2>{denominacion}</h2>
                <h3>${precioVenta}</h3>
            </section>
            <div>
                <button className={editButton} onClick={editFormClick}>Editar</button>
                <button className={deleteButton} onClick={() => deleteArticuloManufacturado(id, token)}>Dar de baja</button>
                <FormIngredientesArticulo ingredientes={ingredientes} token={token} id={id}/>
            </div>
        </div>
        <Modal onClose={editFormClick} modal={modal}>
        <FormArticuloManufacturado token={token} setModal={setModal} articulo={articuloSinImagen} edit={edit} setEdit={setEdit}/> 
        </Modal>
        </>
    )
}