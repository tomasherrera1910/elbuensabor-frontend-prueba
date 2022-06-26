import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/UserLogged/UserContext'

const useLocalStorage = () => {
    const {usuario, setUsuario} = useContext(UserContext)
    const navigate = useNavigate()
    
    const sesionHandler = () => {
        if(usuario){
        setUsuario('')
        window.localStorage.removeItem('userLoggedBuenSabor')
        }
        else{
            navigate('/login')
        }
    }
    return {usuario, setUsuario, sesionHandler}
}

export default useLocalStorage