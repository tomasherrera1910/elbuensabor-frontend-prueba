import { useEffect, useState } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import CocinaCard from './CocinaCard'
import { getPedidos } from '../../utils/pedidos'
import { NotFound } from '../NotFound'

import styles from '../../styles/pedido.module.css'
const {container} = styles
export function Cocinero(){
    const {usuario} = useLocalStorage()
    const [pedidos, setPedidos] = useState([])
    useEffect(() => {
        getPedidos(usuario.token,'enCocina')
        .then(setPedidos)
    },[usuario.token])
    return(
        <div className={container}>
            {(usuario.rol === 'admin' || usuario.rol === 'cocinero') 
            ?
            <section>
            <h1>PEDIDOS PARA COCINAR ({pedidos.length})</h1>
            {pedidos.map(pedido => (
                <CocinaCard key={pedido.id} pedido={pedido}/>
            ))}
            </section>
            :
            <NotFound/>
            }
        </div>
    )
}