import {useRef, useEffect} from 'react'
import { useReactToPrint } from 'react-to-print'

import styles from '../../styles/pedido.module.css'
const {facturaCard, spanSubtotalFactura, totalContainer} = styles
export default function SuFacturaPDF({pedido}){
    const facturaRef = useRef()
    const handlePrint = useReactToPrint({
      content: () => facturaRef.current,
      documentTitle: 'factura buen sabor'
    })
    useEffect(() => {
        handlePrint()
    },[handlePrint])
    return(
        <div style={{display:'none'}}>
        <div ref={facturaRef} style={{display:'flex', justifyContent:"center", alignItems:"center", height:window.innerHeight}}>
        <article className={facturaCard}>
        <h2>Factura EL BUEN SABOR</h2>
          <p><span>Número:</span> {pedido.factura.numero}</p>
          <p><span>Fecha:</span> {pedido.factura.fecha}</p>
          <p><span>Cliente:</span> {pedido.user.nombre} {pedido.user.apellido}</p>
          <p><span>Teléfono:</span> {pedido.user.telefono}</p>
          <p><span>Forma de pago:</span> {pedido.factura.formaPago}</p>
          <h2>Artículos:</h2>
          <ul>
          {pedido.detallesPedidos?.map((detalle) => (
              <li key={detalle.id}>{detalle.articulo} <span>x{detalle.cantidad}</span> - <span className={spanSubtotalFactura}>${(detalle.subtotal * detalle.cantidad)}</span></li>
          ))}
          </ul>
          <section className={totalContainer}>
            <p>Total: <span>${pedido.total}</span></p>
            <p>Descuento: ${Math.floor(pedido.factura.montoDescuento)}</p>
          </section>
          </article>
      </div>
      </div>
    )
}