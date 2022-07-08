import {useState, useEffect} from 'react'
import { deletePedidoDetalle, postPedidoDetalle, putPedidoDetalle } from '../../utils/pedidos'
import CartContext from './CartContext'

const CartItems = (props) => {
    
    const [cartState, setCartState] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        let calculoTotal = 0
        cartState.map(detalle => (
          calculoTotal += detalle.subtotal * detalle.cantidad
        ))
        setTotal(calculoTotal)
    },[cartState])
    const updateCantidad = (data, i) => {
      let arrayNew = [...cartState]
      arrayNew[i] = data
      setCartState(arrayNew)
    }
    const resetCart = () => {
        setCartState([])
    }
    const cartDeleteItem = (id) => {
          setLoading(true)
          deletePedidoDetalle(id, setLoading)
          setCartState(cartState.filter(item => item.id !== id && !null))
    }
    const cartAddItem = (token, pedidoDetalle, setError) => {
        setLoading(true)
        postPedidoDetalle(token, pedidoDetalle)
        .then(data => {
          if(data.error)
            setError(data)
          else  
          setCartState([...cartState, data])})
         .finally(() => setLoading(false)) 
        
    }
    const moreButtonClick = (id, token, cantidad, i, setError) => {
        setLoading(true)
        putPedidoDetalle(id, token, cantidad)
        .then(data => {
          if(data.error)
            setError(data)
          else  
          updateCantidad(data, i)})
          .finally(() => setLoading(false))
    }
    const lessButtonClick = (id, token, cantidad, i) => {
      if(cantidad.cantidad > 0){
          setLoading(true)
          putPedidoDetalle(id, token, cantidad)
          .then(data => updateCantidad(data, i))
          .finally(() => setLoading(false))
      }
      if(cantidad.cantidad < 1){
          cartDeleteItem(id)
      }
    }
    return (
        <CartContext.Provider
          value={{
            cartState,
            total,
            setCartState,
            resetCart,
            moreButtonClick,
            lessButtonClick,
            cartAddItem,
            cartDeleteItem,
            loading
          }}
        >
          {props.children}
        </CartContext.Provider>
      )
    }
export default CartItems    
