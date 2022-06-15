import { useContext } from 'react'
import CartContext from '../../context/CartItems/CartContext'


import styles from '../../styles/cart.module.css'
const {cartButton, cartList, cartListVisible} = styles
export default function Cart(){
    const {cartState} = useContext(CartContext)
    
    const  toggleHandler = () => {
        const cartList = document.getElementById('cartListToggle')
        cartList.classList.toggle(cartListVisible)
    }
    return(
        <>
        <div className={cartButton}>
        <button onClick={toggleHandler}>
            🛒
        </button>
        <div><p>{cartState.cantidad}</p></div>
        </div>
        <section className={cartList} id='cartListToggle'>
            <ul>
            {cartState.items?.map((articulo, i) => (
                <li key={i}><p>{articulo.denominacion}</p><span>${articulo.precioVenta}</span></li>
            ))}
            </ul>
            <p>Total: ${cartState.total}</p>
        </section>
        </>
    )
}