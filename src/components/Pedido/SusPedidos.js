import {useState, useEffect} from 'react'
import { getPedidoXusuario } from '../../utils/pedidos'
import useLocalStorage from '../../hooks/useLocalStorage'
import Spinner from '../Spinner'

import styles from  '../../styles/pedido.module.css'
import SuPedidoCard from './SuPedidoCard'
const {container, showButton} = styles
export default function SusPedidos(){
    const {usuario} = useLocalStorage()
    const [pedidos, setPedidos] = useState([])
    const [mostrarPedidosFinalizados, setMostrarPedidosFinalizados] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    
    const botonMostrar = mostrarPedidosFinalizados ? {text:'Mostrar pedidos pendientes',style:{backgroundColor:"#D03737"}, estado:'finalizados'}
                                                   : {text:'Mostrar pedidos finalizados y rechazados',style:{backgroundColor:"#19216D"}, estado: 'pendientes'}
    useEffect(() => {
        if(!mostrarPedidosFinalizados){
            getPedidoXusuario(usuario.id)
            .then(data => setPedidos(data.reverse().filter(pedido => pedido.estado === 'En revisión...' || pedido.estado === 'En cocina...')))
            .finally(setIsLoading(false))
        }
        else{
            getPedidoXusuario(usuario.id)
            .then(data => setPedidos(data.reverse().filter(pedido => pedido.estado === 'Finalizado' || pedido.estado === 'RECHAZADO')))
        }
    },[mostrarPedidosFinalizados, usuario.id])
    

    return(
        <div className={container}>
            {isLoading 
            ? <Spinner/>
            :
            pedidos.length > 0 
            ?
            <article>
            <button className={showButton} style={botonMostrar.style} onClick={() => setMostrarPedidosFinalizados(!mostrarPedidosFinalizados)}>{botonMostrar.text}</button>   
            {pedidos?.map(pedido => (
                <SuPedidoCard key={pedido.id} pedido={pedido} token={usuario.token}/>
            ))}
            </article>
                :
            <div> 
            <button className={showButton} style={botonMostrar.style} onClick={() => setMostrarPedidosFinalizados(!mostrarPedidosFinalizados)}>{botonMostrar.text}</button>      
            <h2>No tiene pedidos {botonMostrar.estado} en su cuenta!</h2>
            </div>
            }
        </div>
    )
}