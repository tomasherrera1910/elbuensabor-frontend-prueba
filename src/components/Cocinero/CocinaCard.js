import {useEffect, useState} from 'react'
import CocinaIngredientesCard from "./CocinaIngredientesCard";

import styles from '../../styles/cocinero.module.css'
const {cocineroCard} = styles
export default function CocinaCard({pedido}){
    const [horaPedido, setHoraPedido] = useState()
    useEffect(() => {
        const fecha = new Date()
        console.log(`fecha normal ${fecha}`)
        fecha.setMinutes(fecha.getMinutes() + pedido.tiempoEstimadoDeEspera)
        console.log(`fecha con minutos seteados ${fecha}`)
        setHoraPedido(fecha.toLocaleTimeString())
    },[pedido.tiempoEstimadoDeEspera])
    return(
        <article className={cocineroCard}>
            <p>Hora estimada de entrega: {horaPedido}</p>
            
            {pedido.detallesPedidos.map(detalle => (
                <div key={detalle.id}>
                    {detalle.tipoDeArticulo === 'manufacturado' && <h3>{detalle.articulo}</h3>}
                    {detalle.tipoDeArticulo === 'manufacturado' && <CocinaIngredientesCard detalle={detalle}/>}
                </div>
            ))}
        </article>
    )
}