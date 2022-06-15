import {useState, useEffect} from 'react'
import { getArticulosManufacturados } from '../../utils/articulosManufacturados'
import CardMenu from './CardMenu'

import styles from '../../styles/menus.module.css'
const {container} = styles
export function Menus(){
    const [comidas, setComidas] = useState([])
    useEffect(() => {
        getArticulosManufacturados()
        .then(data => setComidas(data.filter(comida => comida.baja === false)))
    },[])
    return(
        <div className={container}> 
            {comidas?.map(comida => (
                <CardMenu key={comida.id} comida={comida}/>
            ))}
        </div>
    )
}