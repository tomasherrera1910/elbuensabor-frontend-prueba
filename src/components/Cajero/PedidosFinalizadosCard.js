import {useState} from 'react'
import { getPedidos, putPedido } from '../../utils/pedidos'

import Spinner from '../Spinner'
import styles from '../../styles/cajero.module.css'
import { postFactura } from '../../utils/factura'
const {cajeroCard, pagoPendiente, pagoRealizado, buttonFinalizado} = styles
export default function PedidosFinalizadosCard({pedido, token, setPedidos}){
    const [loader, setLoader] = useState(false)    
    const buttonInfo = (pedido.tipoEnvio === 'Envío a domicilio' && pedido.estado === 'Finalizado') ? {text:'🛵PEDIDO EN CAMINO...', style:{backgroundColor:'#D03737'}}
                                                                                                    : {text:'PEDIDO FACTURADO', style:{backgroundColor:'#19216D'}}
    const finalizarPedidoClick = () => {
        if(buttonInfo.text === '🛵PEDIDO EN CAMINO...'){
            setLoader(true)
            putPedido(token, pedido.id, {estado:'En camino...'})
            .then(() => {
                    getPedidos(token, 'finalizados')
                    .then(setPedidos)
                    .finally(() => setLoader(false))})
        }
        else if(buttonInfo.text === 'PEDIDO FACTURADO'){
            setLoader(true)
            putPedido(token, pedido.id, {estado:'FACTURADO'})
            .then(() => {
                    postFactura({formaPago:pedido.metodoPago, pedido:pedido.id})
                    .then(() => {
                        getPedidos(token, 'finalizados')
                        .then(setPedidos)
                        .finally(() => setLoader(false))
                    })
                })
        }
    }                                                                                                
                                                                                                    
    return(
        <div className={cajeroCard}>
            {loader
                ?   
            <Spinner/>
                :
            <>
            <ul>
                <li>Hora estimada de entrega: {pedido.horaEstimadaLlegada}</li>
                <li>Cliente: {pedido.user.nombre} {pedido.user.apellido}</li>
                <li>Teléfono cliente: {pedido.user.telefono}</li>
                <li>Método de pago: {pedido.metodoPago}
                {(pedido.metodoPago === 'Mercado Pago' && pedido.estadoMercadoPago === 'approved') && <p className={pagoRealizado}>Pedido pagado!</p>}
                {(pedido.metodoPago === 'Mercado Pago' && pedido.estadoMercadoPago !== 'approved') && <p className={pagoPendiente}>Pedido NO pagado</p>}
                </li>
                <li>Envío: {pedido.tipoEnvio}</li>
                {pedido.tipoEnvio === 'Envío a domicilio' && <li>Domicilio: {pedido.domicilio.calle} - {pedido.domicilio.numero}</li>}
                <li>
                <h3>PEDIDO</h3>
                {pedido.detallesPedidos.map(detalle => (
                    <p key={detalle.id}>{detalle.articulo} - x{detalle.cantidad}</p> 
                ))}
                {pedido.metodoPago === 'Efectivo' && <p>TOTAL: ${pedido.total}</p>}
                </li>
            </ul>
            <button className={buttonFinalizado} style={buttonInfo.style} onClick={finalizarPedidoClick}>{buttonInfo.text}</button>
            </>
            }
            </div>    
            )}