import {useContext, useState} from 'react'
import CartContext from '../../context/CartItems/CartContext'

import styles from '../../styles/cart.module.css'
const {masMenosButtons, masButton, menosButton} = styles
export default function CartArticle({articulo, token, i}){
    const {moreButtonClick, lessButtonClick} = useContext(CartContext)
    const [error, setError] = useState(false)
    return(
        <li>
            <section className={masMenosButtons}>
                    <button className={masButton} onClick={() => moreButtonClick(articulo.id, token, {cantidad: articulo.cantidad+1}, i, setError)}>+</button>
                    <p>{articulo.cantidad}</p>
                    <button className={menosButton} onClick={() => lessButtonClick(articulo.id, token, {cantidad: articulo.cantidad-1}, i)}>-</button>
            </section>
            <p>{articulo.articulo}</p>
            {error.error && <span>{error.error}</span>}
            <span>${articulo.subtotal * articulo.cantidad || 0}</span>
        </li>
    )
}