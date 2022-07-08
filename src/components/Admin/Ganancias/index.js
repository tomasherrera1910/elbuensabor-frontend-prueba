import useRanking from "../../../hooks/useRanking"
import Spinner from '../../Spinner'
import GananciasCard from './GananciasCard'

import styles from '../../../styles/reportes.module.css'
const {container} = styles
export default function Ganancias(){
    const {fechaDesde, setFechaDesde, fechaHasta, setFechaHasta, displayError, loading, ranking, getRankingSubmit} = useRanking('ganancias')
    const gananciaSubmit = e => {
        e.preventDefault()
        getRankingSubmit()
    }
    return(
        <div className={container}>
        <h1>GANANCIAS</h1>
                <form onSubmit={gananciaSubmit}>
                <label>
                Desde:     
                <input type='date' value={fechaDesde} onChange={(e) => setFechaDesde(e.target.value)}/>
                </label>
                <label>
                Hasta: 
                <input type='date' value={fechaHasta} onChange={(e) => setFechaHasta(e.target.value)}/>
                </label>
                <button>MOSTRAR GANANCIAS</button>
                <span style={displayError}>Debe ingresar ambas fechas para ver las ganancias!</span>
                </form>
                {loading && <Spinner/>}
                {ranking.length > 0 && <GananciasCard ganancias={ranking} />}  
        </div>        
    )
}