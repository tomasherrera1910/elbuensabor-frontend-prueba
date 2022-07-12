import {useState, useEffect} from 'react'
import { getPedidoXusuario } from '../utils/pedidos'

const useSusPedidos = (usuarioId) => {
    const [pedidos, setPedidos] = useState([])
    const [mostrarPedidosFacturados, setMostrarPedidosFacturados] = useState(false)
    const [facturaPagina, setFacturaPagina] = useState(1)
    const [facturaPaginasTotales, setFacturaPaginasTotales] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const botonMostrar = mostrarPedidosFacturados ? {text:'Mostrar pedidos pendientes',style:{backgroundColor:"#D03737"}, estado:'finalizados'}
                                                  : {text:'Mostrar pedidos facturados',style:{backgroundColor:"#19216D"}, estado: 'pendientes'}
    useEffect(() => {
        if(!mostrarPedidosFacturados){
            setFacturaPagina(1)
            setIsLoading(true)
            getPedidoXusuario(usuarioId)
            .then(data => setPedidos(data.reverse().filter(pedido => pedido.estado !== 'FACTURADO')))
            .finally(() => setIsLoading(false))
        }
        else{
            setIsLoading(true)
            getPedidoXusuario(usuarioId)
            .then(data => {
                setPedidos(data.reverse().filter(pedido => pedido.estado === 'FACTURADO'))
            })
            .finally(() => setIsLoading(false))
        }
    },[mostrarPedidosFacturados, usuarioId])
    useEffect(() => {
        if(mostrarPedidosFacturados){
            setFacturaPaginasTotales(pedidos.length)
        }
    },[pedidos,mostrarPedidosFacturados])

    return {isLoading, setIsLoading, pedidos, setPedidos, botonMostrar, setMostrarPedidosFacturados, mostrarPedidosFacturados, facturaPagina, setFacturaPagina, facturaPaginasTotales}
}

export default useSusPedidos