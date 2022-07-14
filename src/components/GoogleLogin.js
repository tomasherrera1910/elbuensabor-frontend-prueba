import {useEffect, useState} from 'react'
import jwt_decode from 'jwt-decode'
import { loginGoogle } from '../utils/google'
import validateLogin from '../utils/login'
import { useNavigate } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'

export default function GoogleLogin(){
    const [userGoogle, setUserGoogle] = useState(null)
    const navigate = useNavigate()
    const {usuario, setUsuario} = useLocalStorage()
    
    useEffect(() => {
        if(usuario?.token){
            if(!window.localStorage.getItem('userLoggedBuenSabor')){
            window.localStorage.setItem('userLoggedBuenSabor', JSON.stringify(usuario))
            }
            navigate('/')
        } 
    },[usuario, navigate])
    useEffect(() => {
        if(userGoogle){
        validateLogin(userGoogle)
        .then(setUsuario)
        }
    },[userGoogle, setUsuario])
    
    const handleCallbackResponse = (response) => {
        const userObject = jwt_decode(response.credential)
        loginGoogle({email: userObject.email, nombre:userObject.given_name, apellido:userObject.family_name, username:userObject.name})
        .then(setUserGoogle)
    }
    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            callback: handleCallbackResponse
        })
        google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            {theme: 'outline', size: 'large'}
        )
    },[])
    
    return(
        <div id='signInDiv'>

        </div>
    )
}