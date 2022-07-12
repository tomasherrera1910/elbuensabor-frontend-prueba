import useLocalStorage from '../../hooks/useLocalStorage'
import Spinner from '../Spinner'
import SuPedidoCard from './SuPedidoCard'
import FacturaCard from './SuFacturaCard'

import styles from  '../../styles/pedido.module.css'
import useSusPedidos from '../../hooks/useSusPedidos'
const {container, showButton} = styles
export default function SusPedidos(){
    const {usuario} = useLocalStorage()
    const {isLoading, setIsLoading, 
            pedidos, setPedidos,
            botonMostrar, setMostrarPedidosFacturados, mostrarPedidosFacturados, 
            facturaPagina, setFacturaPagina, facturaPaginasTotales} = useSusPedidos(usuario.id)
    return(
        <div className={container}>
            {isLoading 
            ? <Spinner/>
            :
            pedidos.length > 0 
            ?
            <article>
            <button className={showButton} style={botonMostrar.style} onClick={() => setMostrarPedidosFacturados(!mostrarPedidosFacturados)}>{botonMostrar.text}</button>
            {pedidos?.map(pedido => (
                <div key={pedido.id}>
                    {!mostrarPedidosFacturados && <SuPedidoCard pedido={pedido} token={usuario.token} setLoading={setIsLoading} setPedidos={setPedidos} usuarioId={usuario.id}/>}
                </div>
            ))}
            {mostrarPedidosFacturados && <FacturaCard pedido={pedidos[facturaPagina-1]} pagina={facturaPagina} setPagina={setFacturaPagina} paginasTotales={facturaPaginasTotales}/>}
            </article>
                :
            <div> 
            <button className={showButton} style={botonMostrar.style} onClick={() => setMostrarPedidosFacturados(!mostrarPedidosFacturados)}>{botonMostrar.text}</button>      
            <h2>No tiene pedidos {botonMostrar.estado} en su cuenta!</h2>
            </div>
            }
        </div>
    )
}