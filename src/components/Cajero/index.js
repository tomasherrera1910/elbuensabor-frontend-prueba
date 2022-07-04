import {useState, useEffect} from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import {NotFound} from '../NotFound'
import { getPedidos } from '../../utils/pedidos'
import PedidosPendientesCard from './PedidosPendientesCard'

import styles from '../../styles/pedido.module.css'
const {container} = styles
export function Cajero(){
    const {usuario} = useLocalStorage()
    const [pedidos, setPedidos] = useState([])
    useEffect(() => {
        getPedidos(usuario.token, 'pendientes')
        .then(setPedidos)
    },[usuario.token])
    return(
        <div className={container}>
            {(usuario.rol === 'admin' || usuario.rol === 'cajero') 
            ?
            <section>
            <h1>PEDIDOS PENDIENTES ({pedidos.length})</h1>
            {
                pedidos.map(pedido => (
                    <PedidosPendientesCard key={pedido.id} pedido={pedido} token={usuario.token} setPedidos={setPedidos}/>
                ))
            }
            </section>
            :
            <NotFound/>
            }
        </div>
    )
}