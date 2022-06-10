import { useState } from 'react'
import { deleteArticuloInsumo } from '../../../utils/articulosInsumo'
import FormArticuloInsumo from './FormArticuloInsumo'
import { Modal } from '../../Modal'

import styles from '../../../styles/admin.module.css'
const {editButton, deleteButton, cardInsumos, denominacionArticulo} = styles

export default function CardArticuloInsumo({token, articulo}){
    const  [edit, setEdit] = useState(false)
    const[modal, setModal] = useState(false)
    const {id, denominacion, rubro, precioCompra, precioVenta, esInsumo, stockActual, unidadMedida} = articulo
    const editFormClick = () => {
           setEdit(!edit)
           setModal(!modal)
    }
    return(
        <>
        <div className={cardInsumos}>
        <ul>
        <li><span className={denominacionArticulo}>{denominacion}</span></li>
        <li>Rubro: {rubro}</li>
        <li>Precio compra: ${precioCompra}</li>
        {esInsumo && 
        <li>Precio venta: ${precioVenta}</li>
        }
        <li>Stock actual: {stockActual} {unidadMedida}</li>
        <li>
            <button className={editButton} onClick={editFormClick}>Editar o Agregar Stock</button>
            <button className={deleteButton} onClick={() => deleteArticuloInsumo(id, token)}>Dar de baja</button>
        </li>
        </ul>   
        </div>
        <Modal onClose={editFormClick} modal={modal}>
        <FormArticuloInsumo token={token} setModal={setModal} articulo={articulo} edit={edit}/> 
        </Modal>
        </>
    )
}