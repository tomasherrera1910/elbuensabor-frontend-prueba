import {useState} from 'react'
import {Link} from 'react-router-dom'
import { NotFound } from '../NotFound'

import styles from '../../styles/admin.module.css'
const {container} = styles

export function AdminLandingPage(){
    const [usuario,] = useState(JSON.parse(window.localStorage.getItem('userLoggedBuenSabor')))
    return(
        <div>
        {usuario?.rol === 'admin' 
        ?
        <div className={container}>
            <Link to='users'>Asignación de roles de usuario</Link>
        </div>
        :
        <NotFound/>
        }
        </div>
    )
}
