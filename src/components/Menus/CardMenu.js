import { useContext, useState, useEffect } from 'react'
import CartContext from '../../context/CartItems/CartContext'
import useMostrarMas from '../../hooks/useMostrarMas'
import useLocalStorage from '../../hooks/useLocalStorage'
import Spinner from '../Spinner'
import { Link } from 'react-router-dom'

import styles from '../../styles/menus.module.css'
const {cardMenu, mostrar, buttonBuy, buttonCancel} = styles
export default function CardMenu({comida}){
    const {usuario} = useLocalStorage()
    const {id, imagen, denominacion, precioVenta, ingredientes} = comida
    const {mostrarMasHandler, displayIngredientes, mostrarIngredientes} = useMostrarMas()
    const {cartAddItem,cartDeleteItem, cartState} = useContext(CartContext)

    const [addCartButton, setAddCartButton] = useState(false)
    const [cartButton, setCartButton] = useState({style: buttonBuy, text: 'Agregar al carrito 🛒'})
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
            setCartButton({style: buttonCancel, text: 'SIN STOCK 😭'})
        }
    },[error])
    const clickCartButton = (itemCart) => {
        if(!usuario){
            setLinkLogin({display:'block'})
        }
        else if(!addCartButton){
            cartAddItem(usuario.token, itemCart, setError)
            setAddCartButton(!addCartButton)
            setCartButton({style: buttonCancel, text: 'Quitar del carrito 🛒'})
        }
        else if(addCartButton){
            const detallePedido = cartState.find(pedido => pedido.articuloId === itemCart.articuloId)
            cartDeleteItem(detallePedido?.id)
            setAddCartButton(!addCartButton)
            setCartButton({style: buttonBuy, text: 'Agregar al carrito 🛒'})
        }
    }
    if(loading) return <Spinner/>
    return(
        <article className={cardMenu}>
            <img src={imagen} alt={denominacion}/>
            <section>
                <h2>{denominacion}</h2>
                <p>${precioVenta}</p>
            <button onClick={mostrarMasHandler} className={mostrar}>{mostrarIngredientes}</button>
            <ul style={displayIngredientes}>
                <p>Ingredientes:</p>
                {ingredientes?.map(ingrediente => (
                    <li key={ingrediente.id}>{ingrediente.nombre}</li>
                ))}
            </ul>
            {error.error && <span>{error.error}</span>}
            <p style={linkLogin}>Debe <Link to='/login'>iniciar sesión</Link> para hacer su pedido</p>
            <button className={cartButton.style} onClick={() => clickCartButton({articuloId:id, subtotal:precioVenta, articulo:denominacion, tipoDeArticulo: 'manufacturado'})}>{cartButton.text}</button>
            </section>
        </article>
    )
}
