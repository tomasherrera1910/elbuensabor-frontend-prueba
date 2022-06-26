import {useState, useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import postUser from '../utils/users/postUser'
import handlerChangeForm from '../utils/handlers/handlerChangeForm'

import styles from '../styles/form.module.css'
const {container, title, subtitle, cuentaCreada, campoInvalido} = styles

export function CreateAccount(){
    const [usuario, setUsuario] = useState({
        nombre: '',
        apellido: '',
        username: '',
        email: '',
        clave: '',
        telefono: '',
    })
    const [response, setResponse] = useState({})
    const navigate = useNavigate()
    const linkHome = response['message'] ? 'Redireccionando...'
                                         : 'Volver...'

    useEffect(() => {
        if(response['message'])
        setTimeout(() => {navigate('/login', {replace:true})},1500)
    },[response, navigate])
    
    const handleChange = e => {
        handlerChangeForm(e, setUsuario, usuario)
    }
    const handleSubmit = e => {
    e.preventDefault()
    postUser(usuario)
    .then(setResponse)
    }
    
    return(
        <div className={container}>
            <h1 className={title}>Creá una cuenta
            <p className={subtitle}>de una manera rápida y sencilla.</p>
            </h1>
            <form onSubmit={handleSubmit}>
                <p><input type='text' name='nombre' placeholder='Nombre...' value={usuario.nombre} onChange={handleChange}/></p>
                <p><input type='text' name='apellido' placeholder='Apellido...' value={usuario.apellido} onChange={handleChange}/></p>
                <p><input type='text' name='username' placeholder='Nombre de usuario...' value={usuario.username} onChange={handleChange}/></p>
                {response['username'] && <span className={campoInvalido}>❌El usuario "{response['username']}" ya existe</span>}
             
                <p><input type='email' name='email' placeholder='Email...' value={usuario.email} onChange={handleChange}/></p>
                {response['email'] && <span className={campoInvalido}>❌El mail "{response['email']}" ya tiene una cuenta asociada</span>}
                
                <p><input type='password' name='clave' placeholder='Contraseña...' value={usuario.clave} onChange={handleChange}/></p>
                <p><input type='number' name='telefono' placeholder='Télefono...' value={usuario.telefono} onChange={handleChange}/></p>
            
                <button type='submit'>Crear Cuenta</button>
                {response['message'] && <span className={cuentaCreada}>✔{response['message']}</span>}
                {response['missingField'] && <span className={campoInvalido}>❌{response['missingField']}</span>}
            </form>
                <Link to='/login'>
                {linkHome}
                </Link>
        </div>
    )
}