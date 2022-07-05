import {useState, useEffect} from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import {NotFound} from '../NotFound'
import { getPedidos } from '../../utils/pedidos'
import PedidosPendientesCard from './PedidosPendientesCard'
import PedidosFinalizadosCard from './PedidosFinalizadosCard'

import Spinner from '../Spinner'
import styles from '../../styles/pedido.module.css'
const {container, buttonCajeroChangePedido} = styles
const INTERFAZ_PENDIENTES={title:'PEDIDOS PENDIENTES',
                           buttonText:'Ver pedidos finalizados', 
                           fetchUrl:'pendientes'}
const INTERFAZ_FINALIZADOS ={title:'PEDIDOS FINALIZADOS',
                             buttonText:'Ver pedidos pendientes', 
                             fetchUrl:'finalizados'}
export function Cajero(){
    const {usuario} = useLocalStorage()
    const [interfaz, setInterfaz] = useState(INTERFAZ_PENDIENTES)
    const [pedidos, setPedidos] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        getPedidos(usuario.token, interfaz.fetchUrl)
        .then(setPedidos)
        .finally(() => setLoading(false))
    },[usuario.token, interfaz.fetchUrl])

    const changeInterfaceClick = () => {
        interfaz === INTERFAZ_PENDIENTES ? setInterfaz(INTERFAZ_FINALIZADOS)
                                         : setInterfaz(INTERFAZ_PENDIENTES)
    }

    return(
        <div className={container}>
            {loading 
                ?
            <Spinner/>
                :
            <>    
                {(usuario.rol === 'admin' || usuario.rol === 'cajero') 
                    ?
                <section>
                <h1>{interfaz.title} ({pedidos.length})</h1>
                <button onClick={changeInterfaceClick} className={buttonCajeroChangePedido}>{interfaz.buttonText}</button>
                {
                    pedidos.map(pedido => (
                        <div key={pedido.id}>
                        {interfaz === INTERFAZ_PENDIENTES && <PedidosPendientesCard pedido={pedido} token={usuario.token} setPedidos={setPedidos}/>}
                        {interfaz === INTERFAZ_FINALIZADOS && <PedidosFinalizadosCard pedido={pedido} token={usuario.token} setPedidos={setPedidos}/>}
                        </div>
                    ))
                }
                </section>
                    :
                <NotFound/>
                }
            </> 
            }
        </div>
    )
}