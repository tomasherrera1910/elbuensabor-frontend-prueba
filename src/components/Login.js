import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import validateLogin from '../utils/login'
import handlerChangeForm from '../utils/handlers/handlerChangeForm'

import styles from '../styles/form.module.css'
const {container, firstButton, campoInvalido} = styles

export function Login(){
    const [usuario,setUsuario] = useState({
        email: '',
        clave: ''
    })
    const [response, setResponse] = useState(JSON.parse(window.localStorage.getItem('userLoggedBuenSabor')) || '')
    const navigate  = useNavigate()
    
    useEffect(() => {
        if(response['token']){
            if(!window.localStorage.getItem('userLoggedBuenSabor')){
            window.localStorage.setItem('userLoggedBuenSabor', JSON.stringify(response))
            }
            navigate('/')
        } 
    },[response, navigate])
    
    const handleChange = e => {
        handlerChangeForm(e, setUsuario, usuario)
    }
    const handlerLogin = e => {
        e.preventDefault()
        validateLogin(usuario)
        .then(setResponse)
        setUsuario({
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
            <form onSubmit={handlerLogin}>
                <p>
                <input type='text' placeholder="Correo electrónico..." name='email' value={usuario['email']} onChange={handleChange}/>
                </p>
                <p>
                <input type='password' placeholder="Contraseña..." name='clave' value={usuario['clave']} onChange={handleChange}/>
                </p>
                {response['error'] && <span className={campoInvalido}>❌{response['error']}.</span>}
                <button type='submit' className={firstButton}>Ingresar</button>
                <Link to='/createAccount'>
                <button>Crea tu cuenta</button>
                </Link>
                <Link to='/'>Entrar sin loguearse</Link>
            </form>
            </section>
        </div>
    )
}