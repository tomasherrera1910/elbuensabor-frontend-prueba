import {Link} from 'react-router-dom'
import PedidoPendienteCardHome from './PedidoPendienteCardHome'
import useLocalStorage from '../hooks/useLocalStorage'

import styles from '../styles/home.module.css'
const {containerHome,title, containerImage, containerText, menusCard, bebidasCard, pedidosCard, containerSubSection, menuBebidaContainer} = styles
export function Home(){
    const {usuario} = useLocalStorage()
    return(
        <div className={containerHome}>
            <section className={containerImage}>
                <div className={containerText}>
                    <h1 className={title}>BIENVENIDO AL BUEN SABOR</h1>
                    <h3><strong>Horarios: </strong>Lun a Dom de 20:00 a 00:00, Sab y Dom de 11:00 a 15:00.</h3>
                </div>    
            </section>
            <section className={containerSubSection}>
                <div className={menuBebidaContainer}>
                <Link to='menus' style={{color:'#fff', textDecoration: 'none'}}>
                <section className={menusCard}>
                    <h1 className={title}>MENÚS</h1>
                </section>
                </Link>
                <Link to='bebidas' style={{color:'#fff', textDecoration: 'none'}}>
                <section className={bebidasCard}>
                    <h1 className={title}>BEBIDAS</h1>
                </section>
                </Link>
                </div>
                <section className={pedidosCard}>
                    <PedidoPendienteCardHome usuario={usuario}/>
                </section>
            </section>    
        </div>
    )
}