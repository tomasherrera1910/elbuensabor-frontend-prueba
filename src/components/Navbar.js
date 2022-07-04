import {useEffect} from 'react'
import {Link, useMatch} from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'

import styles from '../styles/navbar.module.css'
import Cart from './Cart'
const {nav, navList, navListVisible, adminStyle, cajeroStyle, cocineroStyle, navButton} = styles



export function Navbar (){
    const {usuario, setUsuario, sesionHandler} = useLocalStorage()
    let matchHome = useMatch('/')
    let matchLogin = useMatch('/login')
    let matchCreateAccount = useMatch('/createAccount')
    const linkAddress = usuario ? '/address'
                                : '/login'
    const linkPedidos = usuario ? '/pedido/susPedidos'
                                : '/login'                            
    useEffect(() => {
        setUsuario(JSON.parse(window.localStorage.getItem('userLoggedBuenSabor')))
    }, [matchHome, setUsuario])
    useEffect(() => {
        const header = document.querySelector('header')
        if(matchLogin || matchCreateAccount){
            header.style.display = 'none'
        }
        else{
            header.style.display = 'block'
        }
    },[matchLogin, matchCreateAccount])
    const buttonName = usuario
                        ? '🔗 CERRAR SESIÓN'
                        : '🔗 INICIAR SESIÓN'
    
    const  toggleHandler = () => {
        const navList = document.getElementById('navListToggle')
        navList.classList.toggle(navListVisible);
    }
    const loginButtonClick = () => {
        sesionHandler()
        toggleHandler()
    }
    return(
        <header>
            <nav className={nav}>
            <Link to='/'>
                <h1>Home</h1>
            </Link>
            <section>
            {usuario && <h2>👤 {usuario.username}</h2>}
            <Cart/>
            <button onClick={toggleHandler} className={navButton}>⚙</button>    
            </section>
            <ul className={navList} id='navListToggle'>
                <li><Link to='/login' onClick={loginButtonClick}>{buttonName}</Link></li>
                <li><Link to='/menus' onClick={toggleHandler}>🍕 MENÚS</Link></li>
                <li><Link to={linkPedidos} onClick={toggleHandler}>🍔 SUS PEDIDOS</Link></li>
                <li><Link to={linkAddress} onClick={toggleHandler}>🏠 DIRECCIONES</Link></li>
                {usuario?.rol === 'admin' && <li><Link to='/admin' className={adminStyle} onClick={toggleHandler}>👨‍💼 ADMIN</Link></li>}
                {(usuario?.rol === 'admin' || usuario?.rol === 'cajero') && <li><Link to='/cajero' className={cajeroStyle} onClick={toggleHandler}>📠 CAJERO</Link></li>}
                {(usuario?.rol === 'admin' || usuario?.rol === 'cocinero') && <li><Link to='/cocinero' className={cocineroStyle} onClick={toggleHandler}>👨‍🍳 COCINERO</Link></li>}
            </ul>
            </nav>
        </header>
    )
}