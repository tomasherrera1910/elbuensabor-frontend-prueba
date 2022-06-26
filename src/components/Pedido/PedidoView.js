import PedidoForm from "./PedidoForm";
import styles from '../../styles/pedido.module.css'
const {spanTotal, liTotal, spanSubtotal} = styles
export default function PedidoView({cartState, total}){
    return(
        <div>
                <h3>Su pedido</h3>
            <ul>
            {cartState.map(item => (
                <li key={item.id}>{item.articulo} <span>x{item.cantidad}</span> - <span className={spanSubtotal}>${item.subtotal * item.cantidad}</span></li>
            ))}
                <li className={liTotal}>El total es de: <span className={spanTotal}>${total}</span></li>
            </ul>
                <PedidoForm/>
            </div>
    )
}