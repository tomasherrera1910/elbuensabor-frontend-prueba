import { useContext } from 'react'
import CartContext from '../../context/CartItems/CartContext'
import useMostrarMas from '../../hooks/useMostrarMas'

import styles from '../../styles/menus.module.css'
const {cardMenu, mostrar, buttonBuy} = styles
export default function CardMenu({comida}){
    const {id, imagen, denominacion, precioVenta, ingredientes} = comida
    const {mostrarMasHandler, displayIngredientes, mostrarIngredientes} = useMostrarMas()
    const {cartAddItem} = useContext(CartContext)
    
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
            <button className={buttonBuy} onClick={() => cartAddItem(id)}>Agregar al carrito 🛒</button>
            </section>
        </article>
    )
}
