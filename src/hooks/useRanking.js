import {useState} from 'react'
import { getRanking } from '../utils/reportes'
    const DISPLAY_ERROR_FALSE = {
        display:"none"
    }
    const DISPLAY_ERROR_TRUE = {
        display:"block",
        color: "#D03737"
    }
const useRanking = (parametroFetch) => {
    
        const [fechaDesde, setFechaDesde] = useState('')
        const [fechaHasta, setFechaHasta] = useState('')
        const [ranking, setRanking] = useState([])
        const [displayError, setDisplayError] = useState(DISPLAY_ERROR_FALSE)
        const [loading, setLoading] = useState(false)
    
        const getRankingSubmit = () => {
            if(fechaDesde && fechaHasta){
                setDisplayError(DISPLAY_ERROR_FALSE)
                setLoading(true)
                getRanking(parametroFetch, fechaDesde, fechaHasta)
                .then(setRanking)
                .finally(() => setLoading(false))
            }
            else{
                setDisplayError(DISPLAY_ERROR_TRUE)
            }
        }
        return {getRankingSubmit, fechaDesde, setFechaDesde, fechaHasta, setFechaHasta, ranking, displayError, loading}
}

export default useRanking