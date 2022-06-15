import { useState, useEffect } from 'react'
import useLocalStorage from '../../../hooks/useLocalStorage'
import { getArticulosInsumo } from '../../../utils/articulosInsumo';
import CardArticuloInsumo from './CardArticuloInsumo';
import { NotFound } from "../../NotFound";
import FormArticuloInsumo from './FormArticuloInsumo';
import { Modal } from '../../Modal';

import styles from '../../../styles/admin.module.css'
const {container, buttonFilter, buttons, addButton, refreshButton, buttonsContainer, containerGrid} = styles

export default function ArticulosInsumo(){
    const {usuario} = useLocalStorage()
    const [articulos, setArticulos] = useState([])
    const [articulosFiltrados, setArticulosFiltrados] = useState(null)
    const[modal, setModal] = useState(false)
    
    useEffect(() => {
        getArticulosInsumo()
        .then(data => setArticulos(articulosFiltrados ?? data.filter(articulo => articulo.baja === false)))
    },[articulos, articulosFiltrados])
    
    const filterHandler = (rubrosFilter) => {
        getArticulosInsumo()
        .then(data => setArticulosFiltrados(data.filter(articulo => rubrosFilter.includes(articulo.rubro.toLowerCase()) && articulo.baja === false)))
    }
    const modalHandler = () => {
        setModal(!modal)
    }
    const refreshHandler = () => {
        setArticulosFiltrados(null)
    }
    return(
        <div className={container}>
            {
            usuario['rol'] === 'admin' ?
            <div>
                <section className={buttons}>
                <button className={buttonFilter} onClick={() => filterHandler(['bebidas con alcohol','gaseosas','bebidas sin gas'])}>Bebidas</button>
                <button className={buttonFilter} onClick={() => filterHandler(['ingredientes'])}>Ingredientes</button> 
                <button className={buttonFilter} onClick={() => filterHandler(['bebidas con alcohol','gaseosas','bebidas sin gas', 'ingredientes'])}>Todos</button> 
                </section>
                <br></br>
                <div className={buttonsContainer}>
                <button className={addButton} onClick={modalHandler}>Agregar artículo</button>
                <button className={refreshButton} onClick={refreshHandler}>🔁</button>
                </div>
                <Modal onClose={modalHandler} modal={modal}>
                <FormArticuloInsumo token={usuario.token} setModal={setModal}/>
                </Modal>
                <div className={containerGrid}>
                {
                    articulos.map(articulo => (
                        <CardArticuloInsumo key={articulo.id}
                                            token={usuario.token}
                                            articulo={articulo} 
                                            />
                ))
                }
                </div>
            </div>
            :
            <NotFound/>
            }
        </div>
    )
}