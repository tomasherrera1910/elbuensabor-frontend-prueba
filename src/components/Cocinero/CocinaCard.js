import {useState} from 'react'
import CocinaIngredientesCard from "./CocinaIngredientesCard";
import Spinner from '../Spinner';

import styles from '../../styles/cocinero.module.css'
import useMostrarMas from "../../hooks/useMostrarMas";
import { getPedidos, putPedido } from '../../utils/pedidos';
const {cocineroCard, articuloCocinaCard, mostrar, buttonFinalizado} = styles
export default function CocinaCard({pedido, setPedidos, token}){
    const {mostrarMasHandler, mostrarIngredientes, displayIngredientes} = useMostrarMas()
    const [finalizadoLoading, setFinalizadoLoading] = useState(false)
    const pedidoFinalizadoClick = () => {
        setFinalizadoLoading(true)
        putPedido(token, pedido.id, {estado:'Finalizado'})
        .then(() => {
            getPedidos(token,'enCocina')
                .then(setPedidos)
                .finally(() => setFinalizadoLoading(false))})
    }
    return(
        <article className={cocineroCard}>
            {finalizadoLoading 
                ?
            <Spinner/>
                :
            <>    
            <p>Hora estimada de entrega: {pedido.horaEstimadaLlegada}</p>
            {pedido.detallesPedidos.map(detalle => (
                <div key={detalle.id} className={articuloCocinaCard}>
                    {detalle.tipoDeArticulo === 'manufacturado' && 
                    <>
                    <h3>{detalle.articulo} x{detalle.cantidad}</h3>
                    <button onClick={mostrarMasHandler} className={mostrar}>{mostrarIngredientes}</button>
                    <CocinaIngredientesCard detalle={detalle} display={displayIngredientes}/>
                    </>
                    }
                </div>
            ))}
            <button className={buttonFinalizado} onClick={pedidoFinalizadoClick}>PEDIDO FINALIZADO</button>
            </>
            }
        </article>
    )
}