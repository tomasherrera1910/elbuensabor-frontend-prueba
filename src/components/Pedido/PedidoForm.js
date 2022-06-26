import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import useLocalStorage from '../../hooks/useLocalStorage'
import { getAddress } from '../../utils/addresses'

import styles from '../../styles/pedido.module.css'
const {select} = styles
const ENVIO_INITIAL_STATE = {
    envio: 'Retiro en el local',
    metodoDePago: 'Efectivo'
}
export default function PedidoForm(){
    const {usuario} = useLocalStorage()
    const [direcciones, setDirecciones] = useState([])
    const [direccion, setDireccion] = useState('')
    const [envioState, setEnvioState] = useState(ENVIO_INITIAL_STATE)
    const [displayEfectivo, setDisplayEfectivo] = useState({display:'block'})
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

    const direccionHandler = e => {
        setDireccion(e.target.value)
    }
    const envioClickHandler = e => {
        setEnvioState({...envioState, envio: e.target.value})
    }
    const metodoPagoClickHandler = e => {
        setEnvioState({...envioState, metodoDePago: e.target.value})
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
                    {direcciones.map((direccion, i) => (
                        <option key={i} value={direccion.id}>{direccion.calle} - {direccion.numero}</option>
                    ))}
                        <option value='otra'>Otra...</option>
                    </select>
                    </section>
                }
                 {((envioState.envio === 'Envío a domicilio' && direcciones.length === 0) || direccion === 'otra') &&
                        <p>Para asignar un domicilio a su cuenta, <Link to='/address'>haga click aquí</Link></p>
                 }
                <h3>Método:</h3>
                <label style={displayEfectivo}><input type='radio' name='metodoPago' checked={envioState.metodoDePago === 'Efectivo'} value='Efectivo' onClick={metodoPagoClickHandler} onChange={() => {}}/>Pago en efectivo</label>
                <label><input type='radio' name='metodoPago' checked={envioState.metodoDePago === 'Mercado Pago'} value='Mercado Pago' onClick={metodoPagoClickHandler} onChange={() => {}}/>Mercado Pago</label> 
            </form>
    )
}