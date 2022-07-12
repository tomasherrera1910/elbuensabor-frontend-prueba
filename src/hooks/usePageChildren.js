import {useState, useEffect} from 'react'

const usePageChildren = (pagina, setPagina, paginasTotales, setRenderPDF) => {
    const [displayAnterior, setDisplayAnterior] = useState({display: 'inline'})
    const [displaySiguiente, setDisplaySiguiente] = useState({display: 'inline'})
    useEffect(() => {
        if(pagina - 1 === 0){
          setDisplayAnterior({display: 'none'})
        }else{
          setDisplayAnterior({display: 'inline'})
        }

        if(pagina + 1 > paginasTotales){
          setDisplaySiguiente({display: 'none'})
        }else{
          setDisplaySiguiente({display: 'inline'})
        }
    },[pagina, paginasTotales])
    
    const nextPageClick = () => {
      setPagina(pagina+1)
      setRenderPDF(false)
    }
    const prevPageClick = () => {
      setPagina(pagina-1)
      setRenderPDF(false)
    }
    return {displayAnterior, displaySiguiente, nextPageClick, prevPageClick}
}

export default usePageChildren