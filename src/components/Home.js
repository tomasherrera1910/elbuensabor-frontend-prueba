import {Link} from 'react-router-dom'
import styles from '../styles/home.module.css'
const {container,title} = styles
export function Home(){
    
    return(
        <div className={container}>
            <h1 className={title}>BIENVENIDO AL BUEN SABOR</h1>
            <h3><strong>Horarios: </strong>Lun a Dom de 20:00 a 00:00, Sab y Dom de 11:00 a 15:00.</h3>
            <Link to='/menus'> Ver los menús</Link>
        </div>
    )
}