import {useState, useEffect} from 'react'
import { useSearchParams } from 'react-router-dom'
import MercadopagoCheckOut from './MercadopagoCheckOut'
import { putPedido } from '../../utils/pedidos'

import styles from '../../styles/pedido.module.css'
const {pedidosCard, warningAlert, pedidoEnCocina, successAlert, mercadopagoButton, spanSubtotal} =styles
export default function SuPedidoCard({pedido, token}){
    const [renderMercadopago,setRenderMercadopago] = useState(false)
    const [articulos, setArticulos] = useState('')
    const [query] = useSearchParams();
    const status = query.get("status");
    useEffect(() => {
        let articulosDescripcion = ''
        pedido.detallesPedidos?.forEach((detalle) => {
            articulosDescripcion +=  `${detalle.articulo} x${detalle.cantidad}, `
        })
        setArticulos(articulosDescripcion)        
    },[pedido.detallesPedidos]) 
    useEffect(() => {
        if(status){
            putPedido(token, pedido.id, {estadoMercadoPago:status})
        }
    },[status, pedido.id, token])
    const mercadoPagoHandler = () => {
        setRenderMercadopago(true)
    }
    return(
        <section key={pedido.id} className={pedidosCard}>
                    <h2>Su pedido:</h2>
                    <p><span>Pedido ID:</span> {pedido.id}</p>
                    {pedido.estado === 'RECHAZADO' && <p><span>Estado:</span><span className={warningAlert}>SU PEDIDO FUE RECHAZADO</span></p>}
                    {pedido.mensaje && <p><span>Motivo:</span><span className={warningAlert}>{pedido.mensaje}</span></p>}
                    {pedido.estado === 'En revisión...' && <p><span>Estado:</span><span className={warningAlert}>Su pedido se esta procesando...</span></p>}
                    {pedido.estado === 'En cocina...' && <p><span>Estado:</span><span className={pedidoEnCocina}>Su pedido está siendo preparado...</span></p>}
                    {pedido.estado === 'Finalizado' && <p><span>Estado:</span><span className={successAlert}>Su pedido ya está listo!</span></p>}
                    <p><span>Fecha:</span> {pedido.fecha}</p>
                    {pedido.tiempoEstimadoDeEspera > 0 && <p><span>Tiempo estimado de espera:</span> {Math.round(pedido.tiempoEstimadoDeEspera)} minutos <span>(partiendo del campo fecha)</span></p>}
                    <p><span>Cliente:</span> {pedido.user.nombre} {pedido.user.apellido}</p>
                    <p><span>Teléfono:</span> {pedido.user.telefono}</p>
                    <p><span>Envío:</span> {pedido.tipoEnvio}</p>
                    {pedido.domicilio &&  <p><span>Dirección:</span> {pedido.domicilio.calle} - {pedido.domicilio.numero}</p>}
                    <p><span>Método de pago:</span> {pedido.metodoPago}</p>
                    {(pedido.metodoPago === 'Mercado Pago' && !pedido.estadoMercadoPago && status !== 'approved') && 
                    <div>
                        <p><span>Estado del pago:</span><span className={warningAlert}>No Realizado</span></p>
                        {pedido.estado !== 'RECHAZADO' &&
                        <button onClick={mercadoPagoHandler} className={mercadopagoButton}>
                            <img src={require(`../../assets/images/mercadopago.png`)} alt={`logo mercadopago`} />
                        </button>
                        }       
                        {renderMercadopago && <MercadopagoCheckOut data={{articulos, total:pedido.total}} id={pedido.id}/>}
                    </div>
                    }
                    {(pedido.estadoMercadoPago === 'approved' || status === 'approved') && <p><span>Estado del pago:</span><span className={successAlert}>PAGADO!</span></p>}
                    <h2>Artículos:</h2>
                    {pedido.detallesPedidos?.map((detalle) => (
                      <ul key={detalle.id}>
                        <li key={detalle.id}>{detalle.articulo} <span>x{detalle.cantidad}</span> - <span className={spanSubtotal}>${detalle.subtotal * detalle.cantidad}</span></li>
                      </ul>
                    ))}
                    <p>Total: ${pedido.total} {pedido.tipoEnvio === 'Retiro en el local' && <span>(con 10% de descuento)</span>}</p>
                </section>
    )
}