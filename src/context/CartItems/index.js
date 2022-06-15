import {useState} from 'react'
import { getOneArticuloManufacturado } from '../../utils/articulosManufacturados'
import CartContext from './CartContext'

const CartItems = (props) => {
    const INITIAL_STATE = {
        items: [],
        cantidad: 0,
        total: 0,
    }
    const [cartState, setCartState] = useState(INITIAL_STATE)
    const resetCart = () => {
        setCartState(INITIAL_STATE)
    }
    
    const cartAddItem = id => {
        getOneArticuloManufacturado(id)
        .then(data => {
          setCartState({items: cartState.items.concat(data),
                        cantidad: cartState.cantidad+1 || 1,
                        total: cartState.total + data.precioVenta})
        })
        console.log(cartState.items)    
    }
    return (
        <CartContext.Provider
          value={{
            cartState,
            setCartState,
            resetCart,
            cartAddItem
          }}
        >
          {props.children}
        </CartContext.Provider>
      )
    }
export default CartItems    
