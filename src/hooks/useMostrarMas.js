import { useState } from 'react'

const useMostrarMas = () => {
    const [mostrarMas, setMostrarMas] = useState(true)
    const [mostrarIngredientes, setMostrarIngredientes] = useState('Mostrar más 🔽')
    const [displayIngredientes, setDisplayIngredientes] = useState({display:'none'})
    const mostrarMasHandler = () => {
        if(mostrarMas){
        setMostrarIngredientes('Mostrar menos 🔼')
        setDisplayIngredientes({display:'block'})
        setMostrarMas(false)
        }else{
        setMostrarIngredientes('Mostrar más 🔽')
        setDisplayIngredientes({display:'none'})
        setMostrarMas(true)   
        }
    }
    return {mostrarMasHandler, mostrarIngredientes, displayIngredientes}
}

export default useMostrarMas