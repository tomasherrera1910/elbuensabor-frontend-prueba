import FormIngredientesArticulo from './FormIngredientesArticulo'

import styles from '../../../styles/admin.module.css'
const {cardManufacturados} = styles

export default function CardArticuloManufacturado({articulo, token}){
    const {id, denominacion, precioVenta, imagen, ingredientes} = articulo
    
    return(
        <div className={cardManufacturados}>
            <img src={imagen} alt={denominacion}/>
            <section>
                <h2>{denominacion}</h2>
                <h3>${precioVenta}</h3>
            </section>
            <div>
                <FormIngredientesArticulo ingredientes={ingredientes} token={token} id={id}/>
            </div>
        </div>
    )
}