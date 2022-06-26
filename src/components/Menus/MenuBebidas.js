import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { getArticulosInsumo } from '../../utils/articulosInsumo'

import styles from '../../styles/menus.module.css'
import CardBebida from './CardBebida'
const {container, gridBebidas, linkBebida} = styles
export default function MenuBebidas() {
    const [bebidas, setBebidas] = useState([])
    useEffect(() => {
        getArticulosInsumo()
        .then(data => setBebidas(data.filter(articulo => articulo.esInsumo === true && articulo.baja === false)))
    },[])
    return(
        <div className={container}>
        <Link to='/menus' className={linkBebida}>ir a los Menús</Link>
        <div className={gridBebidas}>
        {bebidas?.map(bebida => (
            <CardBebida key={bebida.id} bebida={bebida}/>
        ))}
        </div>
        </div>
    )
}