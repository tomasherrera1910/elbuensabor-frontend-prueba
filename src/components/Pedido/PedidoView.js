import {useState} from 'react'
import PedidoForm from "./PedidoForm";
import useLocalStorage from "../../hooks/useLocalStorage";

import styles from '../../styles/pedido.module.css'
const {spanTotal, liTotal, spanSubtotal} = styles
export default function PedidoView({cartState, total}){
    const {usuario} = useLocalStorage()
    const [pedidoInfo, setPedidoInfo] = useState({
        usuario: usuario.id,
        domicilio: '',
        articulos: cartState.map(articulo => articulo.id),
        total,
        metodoPago: ''
    })
    
    return(
        <div>
                <h3>Su pedido</h3>
            <ul>
            {cartState.map(item => (
                <li key={item.id}>{item.articulo} <span>x{item.cantidad}</span> - <span className={spanSubtotal}>${item.subtotal * item.cantidad}</span></li>
            ))}
                <li className={liTotal}>El total es de: <span className={spanTotal}>${total}</span></li>
            </ul>
                <PedidoForm pedidoInfo={pedidoInfo} setPedidoInfo={setPedidoInfo}/>
            </div>
    )
}