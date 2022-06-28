import {useState, useEffect, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useLocalStorage from '../../hooks/useLocalStorage'
import CartContext from '../../context/CartItems/CartContext'
import { getAddress } from '../../utils/addresses'
import { postPedido } from '../../utils/pedidos'

import styles from '../../styles/pedido.module.css'
const {select, realizarPedido} = styles
const ENVIO_INITIAL_STATE = {
    envio: 'Retiro en el local',
    metodoDePago: 'Efectivo'
}
export default function PedidoForm({pedidoInfo, setPedidoInfo}){
    const {usuario} = useLocalStorage()
    const {resetCart} = useContext(CartContext)
    const [direcciones, setDirecciones] = useState([])
    const [direccion, setDireccion] = useState('')
    const [envioState, setEnvioState] = useState(ENVIO_INITIAL_STATE)
    const [displayEfectivo, setDisplayEfectivo] = useState({display:'block'})
    const [displayMissAddress, setDisplayMissAddress] = useState({display:'none', color:'red'})
    const navigate = useNavigate()

    useEffect(() => {
        getAddress(usuario.id)
        .then(setDirecciones)
    },[usuario.id])
    useEffect(() => {
        if(envioState.envio === 'Envío a domicilio' && displayEfectivo.display === 'block'){
            setEnvioState({...envioState, metodoDePago: 'Mercado Pago'})
            setDisplayEfectivo({display:'none'})
        }
        else if(envioState.envio === 'Retiro en el local' && displayEfectivo.display === 'none'){
            setDisplayEfectivo({display:'block'})
        }
    },[envioState, displayEfectivo])
    useEffect(() => {
        console.log(pedidoInfo)
        if(pedidoInfo.metodoPago.envio === 'Envío a domicilio' && !pedidoInfo.domicilio){
            setDisplayMissAddress({display:'block', color:'red'})
        }
        else{
            setDisplayMissAddress({display:'none', color:'red'})
        }
        if((pedidoInfo.metodoPago.envio === 'Envío a domicilio' && pedidoInfo.domicilio) || (pedidoInfo.metodoPago.envio === 'Retiro en el local')){
           postPedido(usuario.token, pedidoInfo)
           .then(() => {
            navigate('/pedido/susPedidos')
            resetCart()
           })
        }
    },[pedidoInfo, usuario.token, navigate, resetCart])

    const direccionHandler = e => {
        setDireccion(e.target.value)
    }
    const envioClickHandler = e => {
        setEnvioState({...envioState, envio: e.target.value})
    }
    const metodoPagoClickHandler = e => {
        setEnvioState({...envioState, metodoDePago: e.target.value})
    }
    const realizarPedidoClick = () => {
        setPedidoInfo({...pedidoInfo, metodoPago:envioState, domicilio:direccion})
    }
    return(
        <form>
                <h3>Envío:</h3>
                <label><input type='radio' name='envio' checked={envioState.envio === 'Retiro en el local'} value='Retiro en el local' onClick={envioClickHandler} onChange={() => {}}/>Retiro en el local (10% de descuento)</label>
                <label><input type='radio' name='envio' checked={envioState.envio === 'Envío a domicilio'} value='Envío a domicilio' onClick={envioClickHandler} onChange={() => {}}/>Envío a domicilio</label>
                {envioState.envio === 'Envío a domicilio' && direcciones.length > 0 &&
                    <section>
                    <label>¿Dónde quiere recibir su pedido?</label>
                    <select className={select} onChange={direccionHandler}>
                        <option value=''>Otra...</option>
                    {direcciones.map((direccion, i) => (
                        <option key={i} value={direccion.id}>{direccion.calle} - {direccion.numero}</option>
                    ))}
                    </select>
                    </section>
                }
                 {((envioState.envio === 'Envío a domicilio' && direcciones.length === 0) || direccion === '') &&
                        <p>Para asignar un domicilio a su cuenta, <Link to='/address'>haga click aquí</Link></p>
                 }
                <h3>Método:</h3>
                <label style={displayEfectivo}><input type='radio' name='metodoPago' checked={envioState.metodoDePago === 'Efectivo'} value='Efectivo' onClick={metodoPagoClickHandler} onChange={() => {}}/>Pago en efectivo</label>
                <label><input type='radio' name='metodoPago' checked={envioState.metodoDePago === 'Mercado Pago'} value='Mercado Pago' onClick={metodoPagoClickHandler} onChange={() => {}}/>Mercado Pago</label> 
                <button type='button' onClick={realizarPedidoClick} className={realizarPedido}>Realizar pedido</button>
                <span style={displayMissAddress}>No puede realizar un pedido a domicilio sin seleccionar su dirección!</span>
            </form>
    )
}