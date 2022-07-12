import {useState, useEffect} from 'react'
import { useSearchParams } from 'react-router-dom'
import MercadopagoCheckOut from './MercadopagoCheckOut'
import { deletePedido, getPedidoXusuario, putPedido } from '../../utils/pedidos'

import styles from '../../styles/pedido.module.css'
const {pedidosCard, warningAlert, pedidoEnCocina, successAlert, mercadopagoButton, spanSubtotal, eliminarPedido} = styles
export default function SuPedidoCard({pedido, token, setLoading, setPedidos, usuarioId}){
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
    const deleteHandler = () => {
        setLoading(true)
        deletePedido(pedido.id)
        .then(() => {
            console.log('get pedidos')
            getPedidoXusuario(usuarioId)
            .then(data => setPedidos(data.reverse().filter(pedido => pedido.estado !== 'FACTURADO')))
            .finally(() => setLoading(false))
        })
    }
    return(
        <section key={pedido.id} className={pedidosCard}>
                    <h2>Su pedido:</h2>
                    <p><span>Pedido ID:</span> {pedido.id}</p>
                    {pedido.estado === 'RECHAZADO' && <p><span>Estado:</span><span className={warningAlert}>SU PEDIDO FUE RECHAZADO</span></p>}
                    {pedido.estado === 'RECHAZADO' && <button className={eliminarPedido} onClick={deleteHandler}>🗑 Eliminar de bandeja de pendientes</button>}
                    {pedido.mensaje && <p><span>Motivo:</span><span className={warningAlert}>{pedido.mensaje}</span></p>}
                    {pedido.estado === 'En revisión...' && <p><span>Estado:</span><span className={warningAlert}>Su pedido se esta procesando...</span></p>}
                    {pedido.estado === 'En cocina...' && <p><span>Estado:</span><span className={pedidoEnCocina}>Su pedido está siendo preparado...</span></p>}
                    {(pedido.estado === 'Finalizado' && pedido.tipoEnvio === 'Retiro en el local') && <p><span>Estado:</span><span className={successAlert}>Su pedido ya está listo para retirar!</span></p>}
                    {(pedido.estado === 'Finalizado' && pedido.tipoEnvio === 'Envío a domicilio') && <p><span>Estado:</span><span className={successAlert}>Su pedido ya salió de la cocina!</span></p>}
                    {pedido.estado === 'En camino...' && <p><span>Estado:</span><span className={successAlert}>Su pedido está en camino 🛵!</span></p>}
                    {pedido.horaEstimadaLlegada && <p><span>Hora Estimada de llegada:</span> {pedido.horaEstimadaLlegada}</p>}
                    <p><span>Fecha:</span> {pedido.fecha}</p>
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
                    {((pedido.estadoMercadoPago === 'approved' || status === 'approved') && pedido.metodoPago === 'Mercado Pago') && <p><span>Estado del pago:</span><span className={successAlert}>PAGADO!</span></p>}
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