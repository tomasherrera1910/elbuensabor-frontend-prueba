import styles from '../../styles/navbarMenu.module.css'
import { getArticulosManufacturados } from '../../utils/articulosManufacturados'
const  {header} = styles

export default function NavbarMenu({setComidas, setLoading}){
    const comidasHandler = (rubro) => {
        if(rubro){
            setLoading(true)
            getArticulosManufacturados()
            .then(data => setComidas(data.filter(comida => comida.baja === false && comida.rubro === rubro)))
            .finally(() => setLoading(false))
        }else{
            setLoading(true)
            getArticulosManufacturados()
            .then(data => setComidas(data.filter(comida => comida.baja === false)))
            .finally(() => setLoading(false))    
        }
    }
    return(
        <header className={header}>
            <button onClick={() => comidasHandler(null)}>TODOS</button>
            <button onClick={() => comidasHandler('pizza')}>PIZZAS</button>
            <button onClick={() => comidasHandler('empanada')}>EMPANADAS</button>
            <button onClick={() => comidasHandler('lomo')}>LOMOS</button>
            <button onClick={() => comidasHandler('hamburguesa')}>HAMBURGUESAS</button>
            <button onClick={() => comidasHandler('otro')}>OTROS</button>
        </header>
    )
}
