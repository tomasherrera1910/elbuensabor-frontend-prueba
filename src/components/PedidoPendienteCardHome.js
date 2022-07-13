import {useState, useEffect} from 'react'
import {getPedidoXusuario} from '../utils/pedidos'
import { Link } from 'react-router-dom'

import styles from '../styles/pedido.module.css'
const {warningAlert,successAlert,spanSubtotal, pedidoEnCocina} = styles
export default function PedidoPendienteCardHome({usuario}){
    const [pedidosPendientes, setPedidosPendientes] = useState([])
    useEffect(() => {
        if(usuario){
        getPedidoXusuario(usuario.id)
        .then((data) => {
            setPedidosPendientes(data.reverse().filter(pedido => pedido.estado !== 'FACTURADO'))
        })        
        }
    },[usuario])
    
    return(
        <>
        {!usuario 
            ?
                <div><h1 style={{textAlign: 'center'}}>PARA VER SUS PEDIDOS <Link to='login'>INICIE SESIÓN</Link></h1></div>
            :
                <>
                {pedidosPendientes?.length === 0
                ?
                <div>
                    <h1 style={{textAlign: 'center'}}>USTED NO TIENE PEDIDOS PENDIENTES AHORA MISMO!</h1>
                    <h3 style={{textAlign: 'center'}}><Link to='pedido/susPedidos'>IR A MIS PEDIDOS</Link></h3>
                </div>
                :
                <div>
                    <h3 style={{textAlign: 'center'}}><Link to='pedido/susPedidos'>IR A MIS PEDIDOS</Link></h3>
                    <h1>PEDIDOS PENDIENTES ({pedidosPendientes.length})</h1>
                    <p><span>Fecha:</span> {pedidosPendientes[0].fecha}</p>
                    {pedidosPendientes[0].estado === 'RECHAZADO' && <p><span>Estado:</span><span className={warningAlert}>SU PEDIDO FUE RECHAZADO</span></p>}
                        {pedidosPendientes[0].mensaje && <p><span>Motivo:</span><span className={warningAlert}>{pedidosPendientes[0].mensaje}</span></p>}
                        {pedidosPendientes[0].estado === 'En revisión...' && <p><span>Estado:</span><span className={warningAlert}>Su pedido se esta procesando...</span></p>}
                        {pedidosPendientes[0].estado === 'En cocina...' && <p><span>Estado:</span><span className={pedidoEnCocina}>Su pedido está siendo preparado...</span></p>}
                        {(pedidosPendientes[0].estado === 'Finalizado' && pedidosPendientes[0].tipoEnvio === 'Retiro en el local') && <p><span>Estado:</span><span className={successAlert}>Su pedido ya está listo para retirar!</span></p>}
                        {(pedidosPendientes[0].estado === 'Finalizado' && pedidosPendientes[0].tipoEnvio === 'Envío a domicilio') && <p><span>Estado:</span><span className={successAlert}>Su pedido ya salió de la cocina!</span></p>}
                        {pedidosPendientes[0].estado === 'En camino...' && <p><span>Estado:</span><span className={successAlert}>Su pedido está en camino 🛵!</span></p>}
                        {pedidosPendientes[0].horaEstimadaLlegada && <p><span>Hora Estimada de llegada:</span> {pedidosPendientes[0].horaEstimadaLlegada}</p>}
                        {pedidosPendientes[0].domicilio &&  <p><span>Dirección:</span> {pedidosPendientes[0].domicilio.calle} - {pedidosPendientes[0].domicilio.numero}</p>}
                        <p><span>Método de pago:</span> {pedidosPendientes[0].metodoPago}</p>
                        {((pedidosPendientes[0].estadoMercadoPago === 'approved') && pedidosPendientes[0].metodoPago === 'Mercado Pago') 
                        ? <p><span>Estado del pago:</span><span className={successAlert}>PAGADO!</span></p>
                        :  pedidosPendientes[0].metodoPago === 'Mercado Pago' && <p><span>Estado del pago:</span><span className={warningAlert}>No Realizado</span></p>
                        }
                        <h2>Artículos:</h2>
                        {pedidosPendientes[0].detallesPedidos?.map((detalle) => (
                        <ul key={detalle.id}>
                            <li key={detalle.id}>{detalle.articulo} <span>x{detalle.cantidad}</span> - <span className={spanSubtotal}>${detalle.subtotal * detalle.cantidad}</span></li>
                        </ul>
                        ))}
                        <p>Total: ${pedidosPendientes[0].total} {pedidosPendientes[0].tipoEnvio === 'Retiro en el local' && <span>(con 10% de descuento)</span>}</p>
                </div>
                }
            </>
        }
        </>
    )
}