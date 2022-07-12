import {useState} from 'react'
import SuFacturaPDF from './SuFacturaPDF'
import usePageChildren from '../../hooks/usePageChildren'

import styles from '../../styles/pedido.module.css'
const {pedidosCard, spanSubtotal, pdfButton, totalContainer, pageContainer} = styles
export default function FacturaCard({pedido, pagina, setPagina, paginasTotales}){
    const [renderPDF, setRenderPDF] = useState(false)
    const {displayAnterior, displaySiguiente, nextPageClick, prevPageClick} = usePageChildren(pagina, setPagina, paginasTotales, setRenderPDF)
       
    const pdfOpenClick = () => {
      setRenderPDF(true)
    }
    return(
          <section className={pedidosCard}>
              <h2>Factura EL BUEN SABOR</h2>
                <p><span>Número:</span> {pedido.factura?.numero}</p>
                <p><span>Fecha:</span> {pedido.factura?.fecha}</p>
                <p><span>Cliente:</span> {pedido.user?.nombre} {pedido.user?.apellido}</p>
                <p><span>Teléfono:</span> {pedido.user?.telefono}</p>
                <p><span>Forma de pago:</span> {pedido.factura?.formaPago}</p>
                <h2>Artículos:</h2>
                <ul>
                {pedido.detallesPedidos?.map((detalle) => (
                    <li key={detalle.id}>{detalle.articulo} <span>x{detalle.cantidad}</span> - <span className={spanSubtotal}>${(detalle.subtotal * detalle.cantidad)}</span></li>
                ))}
                </ul>
                <section className={totalContainer}>
                  <p>Total: <span>${pedido.total}</span></p>
                  <p>Descuento: ${Math.floor(pedido.factura?.montoDescuento)}</p>
                </section>
            <button className={pdfButton} onClick={pdfOpenClick}> <img src={require(`../../assets/images/pdf.png`)} alt={`logo pdf`} /> Ver en PDF</button>
            {renderPDF && <SuFacturaPDF pedido={pedido}/>}
            <footer className={pageContainer}>
              <button onClick={prevPageClick} style={displayAnterior}>Anterior</button>
              <span>Factura {pagina}/{paginasTotales}</span>
              <button onClick={nextPageClick} style={displaySiguiente}>Siguiente</button>
            </footer>
          </section>
    )
}