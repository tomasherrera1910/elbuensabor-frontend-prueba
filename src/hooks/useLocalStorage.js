import { useState } from 'react'

const useLocalStorage = () => {
    const [usuario,] = useState(JSON.parse(window.localStorage.getItem('userLoggedBuenSabor')))
    return {usuario}
}

export default useLocalStorage