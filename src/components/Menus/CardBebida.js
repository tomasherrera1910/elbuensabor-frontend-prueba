import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CartContext from '../../context/CartItems/CartContext'
import useLocalStorage from '../../hooks/useLocalStorage'
import Spinner from '../Spinner'

import styles from '../../styles/menus.module.css'
const {cardBebida, buttonBebidaBuy, buttonBebidaCancel} = styles
export default function CardBebida ({bebida}){
    const {id, denominacion, precioVenta} = bebida
    const {usuario} = useLocalStorage()
    const {cartAddItem,cartDeleteItem, cartState} = useContext(CartContext)

    const [addCartButton, setAddCartButton] = useState(false)
    const [cartButton, setCartButton] = useState({style: buttonBebidaBuy, text: 'Agregar al carrito 🛒'})
    const [loading, setLoading] = useState(true)
    const [linkLogin, setLinkLogin] = useState({display:'none'})
    const [error, setError] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        },1000)
    },[])
    useEffect(() => {
        if(error){
            setAddCartButton(false)
            setCartButton({style: buttonBebidaCancel, text: 'SIN STOCK 😭'})
        }
    },[error])
    const clickCartButton = (itemCart) => {
        if(!usuario){
            setLinkLogin({display:'block'})
        }
        else if(!addCartButton){
            cartAddItem(usuario.token, itemCart, setError)
            setAddCartButton(!addCartButton)
            setCartButton({style: buttonBebidaCancel, text: 'Quitar del carrito 🛒'})
        }
        else if(addCartButton){
            const detallePedido = cartState.find(pedido => pedido.articuloId === itemCart.articuloId)
            cartDeleteItem(detallePedido?.id)
            setAddCartButton(!addCartButton)
            setCartButton({style: buttonBebidaBuy, text: 'Agregar al carrito 🛒'})
        }
    }
    if(loading) return <Spinner/>
    return(
        <article className={cardBebida}>
            <h3>{denominacion}</h3>
            <p>${precioVenta}</p>
            {error.error && <span>{error.error}</span>}
            <p style={linkLogin}>Debe <Link to='/login'>iniciar sesión</Link> para hacer su pedido</p>
            <button className={cartButton.style} onClick={() => clickCartButton({articuloId:id, subtotal:precioVenta, articulo:denominacion, tipoDeArticulo:'insumo'})}>{cartButton.text}</button>
        </article>
    )
}