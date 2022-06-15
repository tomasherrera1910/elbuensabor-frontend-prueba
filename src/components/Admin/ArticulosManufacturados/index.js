import { useState, useEffect } from 'react'
import useLocalStorage from '../../../hooks/useLocalStorage'
import { NotFound } from '../../NotFound'
import { getArticulosManufacturados } from '../../../utils/articulosManufacturados'
import { Modal } from '../../Modal'
import FormArticuloManufacturado from './FormArticuloManufacturado'
import CardArticuloManufacturado from './CardArticuloManufacturado'

import styles from '../../../styles/admin.module.css'
const {container, addButton, containerGrid} = styles

export default function ArticulosManufacturados(){
    const {usuario} = useLocalStorage()
    const [articulos, setArticulos] = useState([])
    const [modal, setModal] = useState(false)
    useEffect(() => {
        getArticulosManufacturados()
        .then(data => setArticulos(data.filter(articulo => articulo.baja === false)))
    },[articulos])
    const modalHandler = () => {
        setModal(!modal)
    }
    
    return(
        <div className={container}>
        {usuario?.rol === 'admin' 
        ?    
        <div>
            <button className={addButton} onClick={modalHandler}>Agregar plato</button>
            <Modal onClose={modalHandler} modal={modal}>
                <FormArticuloManufacturado token={usuario.token} setModal={setModal}/>
            </Modal>
            <div className={containerGrid}>
            {articulos.map(articulo => (
                <CardArticuloManufacturado key={articulo.id} articulo={articulo} token={usuario.token}/>
            ))}
            </div>
        </div>
        :
        <NotFound/>
        }
        </div>
    )
}