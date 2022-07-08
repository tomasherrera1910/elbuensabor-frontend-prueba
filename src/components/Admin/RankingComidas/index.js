import useRanking from '../../../hooks/useRanking'
import RankingCard from './RankingCard'
import Spinner from '../../Spinner'

import styles from '../../../styles/reportes.module.css'
const {container} = styles
export default function RankingComidas(){
    const {fechaDesde, setFechaDesde, fechaHasta, setFechaHasta, displayError, ranking, loading, getRankingSubmit} = useRanking('rankingComidas')

    const rankingSubmit = e => {
        e.preventDefault()
        getRankingSubmit()
    }
    return(
        <div className={container}>
            <h1>RANKING DE COMIDAS MÁS PEDIDAS</h1>
            <form onSubmit={rankingSubmit}>
            <label>
            Desde:     
            <input type='date' value={fechaDesde} onChange={(e) => setFechaDesde(e.target.value)}/>
            </label>
            <label>
            Hasta: 
            <input type='date' value={fechaHasta} onChange={(e) => setFechaHasta(e.target.value)}/>
            </label>
            <button>Crear Ranking</button>
            <span style={displayError}>Debe ingresar ambas fechas para realizar el ranking!</span>
            </form>
            {loading && <Spinner/>}
            {ranking.length > 0 && <RankingCard ranking={ranking} />}
        </div>
    )
}