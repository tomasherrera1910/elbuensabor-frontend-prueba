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
                <li><Link to='users'>🔹Asignación de roles de usuario 👨🏽‍🍳👨🏽‍💼🔹</Link></li>
                <li><Link to='articulosInsumo'>🔹Catálogo de artículos insumo🧀🥚🔹</Link></li>
                <li><Link to='articulosManufacturados'>🔹Administrar platos del restaurante🍔🍕🔹</Link></li>
            </ul>
        </div>
        :
        <NotFound/>
        }
        </div>
    )
}
