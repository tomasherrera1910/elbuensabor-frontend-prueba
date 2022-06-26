import { useContext } from 'react'
import CartContext from '../../context/CartItems/CartContext'
import useLocalStorage from '../../hooks/useLocalStorage'

import styles from  '../../styles/pedido.module.css'
import { NotFound } from '../NotFound'
import PedidoView from './PedidoView'
const {container} = styles
export function Pedido(){
    const {usuario} = useLocalStorage()
    const {cartState, total} = useContext(CartContext)
    return(
        <div className={container}>
            {usuario && cartState.length > 0
            ?
            <PedidoView cartState={cartState} total={total}/>
            :
            <NotFound/>
            }
        </div>
    )
}