import {useState, useEffect} from 'react'
import { getPedido } from '../../utils/pedidos'
import useLocalStorage from '../../hooks/useLocalStorage'

import styles from  '../../styles/pedido.module.css'
import Spinner from '../Spinner'
const {container,pedidosCard, spanSubtotal, pedidoEnRevision, pedidoEnCocina, pedidoFinalizado} = styles
export default function SusPedidos(){
    const {usuario} = useLocalStorage()
    const [pedidos, setPedidos] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        getPedido(usuario.id)
        .then(setPedidos)
        .finally(setIsLoading(false))
    },[usuario.id])
    
    return(
        <div className={container}>
            {isLoading 
            ? <Spinner/>
            :
            <article>
            {pedidos?.map(pedido => (
                <section key={pedido.id} className={pedidosCard}>
                    <h2>Su pedido:</h2>
                    <p><span>Pedido ID:</span> {pedido.id}</p>
                    {pedido.estado === 'En revisión...' && <p><span>Estado:</span><span className={pedidoEnRevision}>Su pedido se esta procesando...</span></p>}
                    {pedido.estado === 'En cocina...' && <p><span>Estado:</span><span className={pedidoEnCocina}>Su pedido está siendo preparado...</span></p>}
                    {pedido.estado === 'Finalizado' && <p><span>Estado:</span><span className={pedidoFinalizado}>Su pedido ya está listo!</span></p>}
                    <p><span>Fecha:</span> {pedido.fecha}</p>
                    <p><span>Tiempo estimado de espera:</span> {Math.round(pedido.tiempoEstimadoDeEspera)} minutos <span>(partiendo del campo fecha)</span></p>
                    <p><span>Cliente:</span> {pedido.user.nombre} {pedido.user.apellido}</p>
                    <p><span>Teléfono:</span> {pedido.user.telefono}</p>
                    <p><span>Envío:</span> {pedido.tipoEnvio}</p>
                    <p><span>Método de pago:</span> {pedido.metodoPago}</p>
                    <h2>Artículos:</h2>
                    {pedido.detallesPedidos?.map((detalle) => (
                      <ul key={detalle.id}>
                        <li key={detalle.id}>{detalle.articulo} <span>x{detalle.cantidad}</span> - <span className={spanSubtotal}>${detalle.subtotal * detalle.cantidad}</span></li>
                      </ul>
                    ))}
                    <p>Total: ${pedido.total} {pedido.tipoEnvio === 'Retiro en el local' && <span>(con 10% de descuento)</span>}</p>
                </section>
            ))}
            </article>
            }
        </div>
    )
}