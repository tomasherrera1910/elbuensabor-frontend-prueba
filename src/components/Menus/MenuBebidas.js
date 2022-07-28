import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { getArticulosInsumo } from '../../utils/articulosInsumo'

import styles from '../../styles/menus.module.css'
import CardBebida from './CardBebida'
import NavbarBebidas from './NavbarBebidas'
import Spinner from '../Spinner'
const {gridBebidas, linkBebida, containerSpinner} = styles
export default function MenuBebidas() {
    const [bebidas, setBebidas] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        getArticulosInsumo()
        .then(data => setBebidas(data.filter(articulo => articulo.esInsumo === true && articulo.baja === false)))
        .finally(() => setLoading(false))
    },[])
    if(loading) return <div className={containerSpinner}><Spinner/></div>
    return(
        <div>
        <NavbarBebidas setBebidas={setBebidas} setLoading={setLoading}/>    
        <Link to='/menus' className={linkBebida} style={{backgroundColor: "#a12525"}}>ir a los Menús</Link>
        <div className={gridBebidas}>
        {bebidas?.map(bebida => (
            <CardBebida key={bebida.id} bebida={bebida}/>
        ))}
        </div>
        </div>
    )
}