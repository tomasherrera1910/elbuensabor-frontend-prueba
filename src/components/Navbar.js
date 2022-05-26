import {useEffect, useState} from 'react'
import {useNavigate, Link, useMatch} from 'react-router-dom'

import styles from '../styles/navbar.module.css'
const {nav, navList, navListVisible, adminStyle} = styles



export function Navbar (){
    const [usuario, setUsuario] = useState(JSON.parse(window.localStorage.getItem('userLoggedBuenSabor')))
    const navigate = useNavigate()
    let matchHome = useMatch('/')
    let matchLogin = useMatch('/login')
    let matchCreateAccount = useMatch('/createAccount')
    const linkAddress = usuario ? '/address'
                                : '/login'
    useEffect(() => {
        setUsuario(JSON.parse(window.localStorage.getItem('userLoggedBuenSabor')))
    }, [matchHome])
    useEffect(() => {
        const header = document.querySelector('header')
        if(matchLogin || matchCreateAccount){
            header.style.display = 'none'
        }
        else{
            header.style.display = 'block'
        }
    },[matchLogin, matchCreateAccount])
    const buttonName = window.localStorage.getItem('userLoggedBuenSabor') 
                        ? '🔗 CERRAR SESIÓN'
                        : '🔗 INICIAR SESIÓN'
    
    const  toggleHandler = () => {
        const navList = document.querySelector('ul')
        navList.classList.toggle(navListVisible);
    }
    const sesionHandler = () => {
        if(window.localStorage.getItem('userLoggedBuenSabor')){
        window.localStorage.removeItem('userLoggedBuenSabor')
        }
        else{
            navigate('/login')
        }
    }
    
    return(
        <header>
            <nav className={nav}>
            <Link to='/'>
                <h1>Home</h1>
            </Link>
            <section>
            {usuario && <h2>👤 {usuario.username}</h2>}
            <button onClick={toggleHandler}>⚙</button>    
            </section>
            <ul className={navList}>
                <li><Link to='/login' onClick={sesionHandler}>{buttonName}</Link></li>
                <li><Link to='/'>🍕 MENÚS</Link></li>
                <li><Link to={linkAddress}>🏠 DIRECCIONES</Link></li>
                {usuario?.rol === 'admin' && <li><Link to='/admin' className={adminStyle}>👨‍💼 ADMIN</Link></li>}
            </ul>
            </nav>
        </header>
    )
}