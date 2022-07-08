import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { getArticulosManufacturados } from '../../utils/articulosManufacturados'
import CardMenu from './CardMenu'
import NavbarMenu from './NavbarMenu'

import styles from '../../styles/menus.module.css'
import Spinner from '../Spinner'
const {grid, linkBebida, containerSpinner} = styles
export function Menus(){
    const [comidas, setComidas] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        getArticulosManufacturados()
        .then(data => setComidas(data.filter(comida => comida.baja === false)))
        .finally(() => setLoading(false))
    },[])

    if(loading) return <div className={containerSpinner}><Spinner/></div>
    return(
        <div>
            <NavbarMenu setComidas={setComidas} setLoading={setLoading}/>
            <Link to='/bebidas' className={linkBebida}>ir a Bebidas</Link> 
            <div className={grid}>
            {comidas?.map(comida => (
                <CardMenu key={comida.id} comida={comida}/>
            ))}
            </div>
        </div>
    )
}