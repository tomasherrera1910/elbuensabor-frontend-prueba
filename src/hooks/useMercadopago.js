import {useState, useEffect} from 'react'
import { useSearchParams } from 'react-router-dom'
import { putPedido } from '../utils/pedidos';

const SETTINGS_FETCH = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_MP_ACCESSTOKEN}`,
        }
}
const useMercadopago = (pedido, token) => {
    const [articulos, setArticulos] = useState("")
    const [status, setStatus] = useState(false)
    const [query] = useSearchParams()
    const external_reference = query.get("external_reference");
    const payment_id = query.get("payment_id")
    useEffect(() => {
        let articulosDescripcion = ''
        pedido.detallesPedidos?.forEach((detalle) => {
            articulosDescripcion +=  `${detalle.articulo} x${detalle.cantidad}, `
        })
        setArticulos(articulosDescripcion)        
    },[pedido.detallesPedidos, ]) 
    
    useEffect(() => {
        if(payment_id){
            fetch(`https://api.mercadopago.com/v1/payments/${payment_id}`, SETTINGS_FETCH)
            .then(response => response.json())
            .then(data => {
                if(data.status === 'approved'){
                    console.log(data.status)
                    setStatus(data.status)
                    putPedido(token, external_reference , {estadoMercadoPago:data.status})
                }
            })
        }
    },[external_reference,payment_id, token])
    
    return {articulos, status}
}

export default useMercadopago