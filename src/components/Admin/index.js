import {useState} from 'react'
import {Link} from 'react-router-dom'
import { NotFound } from '../NotFound'

import styles from '../../styles/admin.module.css'
const {container, adminOptions} = styles

export function AdminLandingPage(){
    const [usuario,] = useState(JSON.parse(window.localStorage.getItem('userLoggedBuenSabor')))
    return(
        <div>
        {usuario?.rol === 'admin' 
        ?
        <div className={container}>
            <ul className={adminOptions}>
                <Link to='users'><li>🔹Asignación de roles de usuario 👨🏽‍🍳🔹</li></Link>
                <Link to='articulosInsumo'><li>🔹Catálogo de artículos insumo🧀🔹</li></Link>
                <Link to='articulosManufacturados'><li>🔹Administrar platos del restaurante🍕🔹</li></Link>
                <Link to='rankingComidas'><li>🔹Ranking comidas más pedidas 🔝🔹</li></Link>
                <Link to='rankingPedidos'><li>🔹Ranking usuarios con más Pedidos 🧘‍♂️🔹</li></Link>
                <Link to='ingresos'><li>🔹Ingresos💸🔹</li></Link>
                <Link to='ganancias'><li>🔹Ganancias💹🔹</li></Link>
            </ul>
        </div>
        :
        <NotFound/>
        }
        </div>
    )
}
