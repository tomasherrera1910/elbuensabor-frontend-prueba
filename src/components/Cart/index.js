import { useContext } from 'react'
import { Link } from 'react-router-dom'
import CartContext from '../../context/CartItems/CartContext'
import useLocalStorage from '../../hooks/useLocalStorage'

import CartArticle from './CartArticle'
import CartIcon from '../svg/CartIcon'
import stylesNavbar from '../../styles/navbar.module.css'
import styles from '../../styles/cart.module.css'
const {cartButton, cartList, cartListVisible, totalStyle, continuarPedido} = styles
const {iniciarSesion} = stylesNavbar
export default function Cart(){
    const {cartState, total} = useContext(CartContext)
    const {usuario} = useLocalStorage()
    const  toggleHandler = () => {
        const cartList = document.getElementById('cartListToggle')
        cartList.classList.toggle(cartListVisible)
    }
    const displayNewItemInCart = cartState.length === 0 ? {display:'none'}
                                                        : {display:'block'}
    return(
        <>
        <div className={cartButton}>
        <button onClick={toggleHandler}>
            <CartIcon/>
        </button>
        <div style={displayNewItemInCart}><p>!</p></div>
        </div>
        <section className={cartList} id='cartListToggle'>
            {usuario 
                ? 
                <div>
                <ul>
                {cartState?.map((articulo, i) => (
                    <CartArticle key={i} articulo={articulo} token={usuario.token} i={i}/>
                ))}
                </ul>
                <p className={totalStyle}>Total: ${total}</p>
                {total > 0 &&
                <Link to='/pedido' className={continuarPedido} onClick={toggleHandler}>CONTINUAR CON EL PEDIDO 🍜</Link>
                }
                </div>
                :
                <div className={iniciarSesion}>
                <p>¡Debe Iniciar Sesión antes de hacer un pedido!</p>
                <Link to='/login' onClick={toggleHandler}>Haz click aquí para iniciar sesión</Link>
                </div>    
            }
        </section>
        </>
    )
}