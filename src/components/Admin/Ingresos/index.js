import useRanking from '../../../hooks/useRanking'
import Spinner from '../../Spinner'
import IngresosCard from './IngresosCard'

import styles from '../../../styles/reportes.module.css'
const {container} = styles
export default function Ingresos(){
    const {fechaDesde, setFechaDesde, fechaHasta, setFechaHasta, displayError, loading, ranking, getRankingSubmit} = useRanking('ingresos')

    const ingresosSubmit = e => {
        e.preventDefault()
        getRankingSubmit()
    }
    
    return(
        <div className={container}>
            <h1>INGRESOS</h1>
            <form onSubmit={ingresosSubmit}>
            <label>
            Desde:     
            <input type='date' value={fechaDesde} onChange={(e) => setFechaDesde(e.target.value)}/>
            </label>
            <label>
            Hasta: 
            <input type='date' value={fechaHasta} onChange={(e) => setFechaHasta(e.target.value)}/>
            </label>
            <button>MOSTRAR INGRESOS</button>
            <span style={displayError}>Debe ingresar ambas fechas para ver los ingresos!</span>
            </form>
            {loading && <Spinner/>}
            {ranking.length > 0 && <IngresosCard ingresos={ranking} />}
        </div>
    )
}