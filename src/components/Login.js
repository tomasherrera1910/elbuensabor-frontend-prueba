import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import validateLogin from '../utils/login'
import handlerChangeForm from '../utils/handlers/handlerChangeForm'
import useLocalStorage from '../hooks/useLocalStorage'
import GoogleLogin from './GoogleLogin'
import Spinner from './Spinner'

import styles from '../styles/form.module.css'
const {container, firstButton, campoInvalido} = styles

export function Login(){
    const [usuarioForm, setUsuarioForm] = useState({
        email: '',
        clave: ''
    })
    const [loading, setLoading] = useState(false)
    const {usuario, setUsuario} = useLocalStorage()
    const navigate = useNavigate()
    useEffect(() => {
        if(usuario?.token){
            if(!window.localStorage.getItem('userLoggedBuenSabor')){
            window.localStorage.setItem('userLoggedBuenSabor', JSON.stringify(usuario))
            }
            navigate('/')
        } 
    },[usuario, navigate])
    const handleChange = e => {
        handlerChangeForm(e, setUsuarioForm, usuarioForm)
    }
    const handlerLogin = e => {
        e.preventDefault()
        setLoading(true)
        validateLogin(usuarioForm)
        .then(setUsuario)
        .finally(() => setLoading(false))
        setUsuarioForm({
            email:'',
            clave:''
        })
    }
   return(
        <div className={container}>
            
            <section>
                <img src={require(`../assets/images/elBuenSaborLogo.png`)} alt={`Logo Buen Sabor`} />
            </section>
            <section>
                <GoogleLogin/>
                {loading
                    ?
                    <Spinner/>    
                    :
                    <form onSubmit={handlerLogin}>
                        <p>
                        <input type='text' placeholder="Correo electrónico..." name='email' value={usuarioForm['email']} onChange={handleChange}/>
                        </p>
                        <p>
                        <input type='password' placeholder="Contraseña..." name='clave' value={usuarioForm['clave']} onChange={handleChange}/>
                        </p>
                        {usuario?.error && <span className={campoInvalido}>❌{usuario?.error}.</span>}
                        <button type='submit' className={firstButton}>Ingresar</button>
                        <Link to='/createAccount'>
                        <button>Crea tu cuenta</button>
                        </Link>
                        <Link to='/'>Entrar sin loguearse</Link>
                    </form>
                }       
            </section>
        </div>
    )
}