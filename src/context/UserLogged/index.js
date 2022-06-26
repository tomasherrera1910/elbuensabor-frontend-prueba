import {useState} from 'react'
import UserContext from './UserContext'

const UserLogged = (props) => {
    
    const [usuario, setUsuario] = useState(JSON.parse(window.localStorage.getItem('userLoggedBuenSabor')) || '')
   
    return (
        <UserContext.Provider
          value={{
            usuario,
            setUsuario
          }}
        >
          {props.children}
        </UserContext.Provider>
      )
    }
export default UserLogged    
