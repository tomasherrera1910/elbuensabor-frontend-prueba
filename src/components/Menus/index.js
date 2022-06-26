import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { getArticulosManufacturados } from '../../utils/articulosManufacturados'
import CardMenu from './CardMenu'

import styles from '../../styles/menus.module.css'
const {container, grid, linkBebida} = styles
export function Menus(){
    const [comidas, setComidas] = useState([])
    useEffect(() => {
        getArticulosManufacturados()
        .then(data => setComidas(data.filter(comida => comida.baja === false)))
    },[])
    return(
        <div className={container}>
            <Link to='/bebidas' className={linkBebida}>ir a Bebidas</Link> 
            <div className={grid}>
            {comidas?.map(comida => (
                <CardMenu key={comida.id} comida={comida}/>
            ))}
            </div>
        </div>
    )
}