import {useState, useEffect} from 'react'
import { getPedidos, getPedidoStock, putPedido } from '../../utils/pedidos'
import {Modal} from '../Modal'
import Spinner from '../Spinner' 

import styles from '../../styles/cajero.module.css'
const {cajeroCard, pagoPendiente, pagoRealizado, stockCard, stockSuficiente, stockInsuficiente, buttonAceptado, buttonRechazado, buttons, spinner} = styles
export default function PedidosPendientesCard({pedido, token, setPedidos}){
    const [stockPedido, setStockPedido] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [kitchenLoader, setKitchenLoader] = useState(false)
    useEffect(() => {
        getPedidoStock(pedido.id)
        .then(setStockPedido)
        .finally(() => setLoading(false))
    },[pedido.id])
    
    const pedidoACocinaClick = () => {
        setKitchenLoader(true)
        putPedido(token, pedido.id, {estado:'En cocina...'})
        .then(() => {
                getPedidos(token, 'pendientes')
                .then(setPedidos)
                .finally(() => setKitchenLoader(false))})
    }

    const [modal, setModal] = useState(false)
    const [mensajeRechazo, setMensajeRechazo] = useState('')
    const rechazarPedidoClick = () => {
        setModal(!modal)
    }
    const rechazarPedidoSubmit = e => {
        e.preventDefault()
        setKitchenLoader(true)
        putPedido(token, pedido.id, {estado:'RECHAZADO', mensaje:mensajeRechazo})
        .then(() => {
                getPedidos(token, 'pendientes')
                .then(setPedidos)
                .finally(() => setKitchenLoader(false))})
    }
    return(
        <div className={cajeroCard}>
            {kitchenLoader
                ?   
            <Spinner/>
                :
            <>
            <ul>
                <li>Pedido fecha: {pedido.fecha}</li>
                <li>Cliente: {pedido.user.nombre} {pedido.user.apellido}</li>
                <li>Método de pago: {pedido.metodoPago}
                {(pedido.metodoPago === 'Mercado Pago' && pedido.estadoMercadoPago === 'approved') && <p className={pagoRealizado}>Pedido pagado!</p>}
                {(pedido.metodoPago === 'Mercado Pago' && pedido.estadoMercadoPago !== 'approved') && <p className={pagoPendiente}>Pedido NO pagado</p>}
                </li>
                {isLoading 
                ? <li className={spinner}><Spinner/></li>
                :
                <li>
                    {stockPedido.length > 0 && <h3>Stock</h3>}
                    {
                        stockPedido.map((stockDetalle, i) => (
                            <article key={i} className={stockCard}>
                               <h4>{stockDetalle.articulo}:</h4>
                               <p className={stockDetalle.stock >= stockDetalle.cantidad ? stockSuficiente : stockInsuficiente}>
                                Stock Disponible: {stockDetalle.stock} {stockDetalle.medida}
                               </p>
                               <p>Stock Necesario: {stockDetalle.cantidad} {stockDetalle.medida}</p>
                            </article>
                    ))}
                </li>
                }
            </ul>
            <section className={buttons}>
            <button className={buttonAceptado} onClick={pedidoACocinaClick}>MANDAR A COCINA</button>
            <button className={buttonRechazado} onClick={rechazarPedidoClick}>RECHAZAR PEDIDO</button>
            </section>
            </>    
            }
            <Modal modal={modal} onClose={rechazarPedidoClick}>
                <form onSubmit={rechazarPedidoSubmit}>
                <label> Notificar al cliente porque su pedido fue rechazado:
                    <textarea value={mensajeRechazo} onChange={e => setMensajeRechazo(e.target.value)}></textarea>
                </label>    
                <button>Rechazar pedido</button>
                </form>
            </Modal>
        </div>
    )
}