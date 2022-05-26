import {useState} from 'react'

import styles from '../styles/home.module.css'
const {container} = styles
export function Home(){
    const [usuario, ] = useState(JSON.parse(window.localStorage.getItem('userLoggedBuenSabor')))
    return(
        <div className={container}>
            BIENVENIDO AL BUEN SABOR {usuario?.username}
            <p>El Delivery de comidas de la ciudad “El Buen Sabor”, ofrece a sus clientes una amplia variedad de bebidas y de comidas de fabricación propia, posee un
            horario de atención de lunes a domingos de 20:00 a 12:00, y de sábados y domingos de 11:00 a 15:00. L</p>
        </div>
    )
}