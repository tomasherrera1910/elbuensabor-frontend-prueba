import {useState, useEffect} from 'react'
import { Modal } from './Modal'
import handlerChangeForm from '../utils/handlers/handlerChangeForm'
import { getAddress, postAddress, deleteAddress } from '../utils/addresses'

import styles from '../styles/home.module.css'
const {container, buttonStyle, table} = styles

export function Address(){
    const[usuarioToken,] = useState(JSON.parse(window.localStorage.getItem('userLoggedBuenSabor')))
    const[modal, setModal] = useState(false)
    const[direccion, setDireccion] = useState({
        calle: '',
        numero: '',
        localidad: ''
    })
    const[direcciones, setDirecciones] = useState([])
    const handlerAddress = e => {
    handlerChangeForm(e, setDireccion, direccion)
    }
    const modalHandler = () => {
        setDireccion({
            calle: '',
            numero: '',
            localidad: '' 
        })
        setModal(!modal)
    }
    
    const submitAddressHandler = e => {
        e.preventDefault()
        postAddress(direccion, usuarioToken.token)
        .then(data => setDirecciones(direcciones.concat(data)))
    }
    useEffect(() => {
        getAddress(usuarioToken.id)
        .then(setDirecciones)
    },[usuarioToken.id, direcciones])
    return(
        <div className={container}>
            {direcciones.length === 0 
            ?
            <div>
            <p>Todavía no tenes ninguna dirección asociada a tu cuenta!
            Ingresá una antes de hacer tus pedidos.</p>
            </div>
            :
            <table className={table}>
                <caption>Sus direcciones</caption>
                <thead>
                    <tr>
                        <th>Calle</th>
                        <th>Número</th>
                        <th>Localidad</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {direcciones.map((address, i) => (
                    <tr key={i}>
                        <td>{address.calle}</td>    
                        <td>{address.numero}</td>    
                        <td>{address.localidad}</td>
                        <td><p onClick={() => deleteAddress(address.id)}>🗑</p></td>    
                    </tr>
                        ))}
                </tbody>
            </table>
            }
            <button onClick={modalHandler} className={buttonStyle}>Añadir dirección</button>
            <Modal onClose={modalHandler} modal={modal}>
                <h2>Ingrese su dirección</h2>
                <form onSubmit={submitAddressHandler}>
                    <p><input type='text' name='calle' placeholder='Calle...' onChange={handlerAddress} value={direccion['calle']}/></p>
                    <p><input type='number' name='numero' placeholder='Nro Calle...' onChange={handlerAddress} value={direccion['numero']}/></p>
                    <p><input type='text' name='localidad' placeholder='Localidad...' onChange={handlerAddress} value={direccion['localidad']}/></p>
                    <button>Agregar dirección</button>
                </form>
            </Modal>
        </div>
    )
}