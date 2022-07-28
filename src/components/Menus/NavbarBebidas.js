import styles from '../../styles/navbarMenu.module.css'
import { getArticulosInsumo } from '../../utils/articulosInsumo'
const  {navbarBebidas} = styles

export default function NavbarBebidas({setBebidas, setLoading}){
    const bebidasHandler = (rubro) => {
        if(rubro){
            setLoading(true)
            getArticulosInsumo()
            .then(data => setBebidas(data.filter(bebida => bebida.baja === false && bebida.rubro === rubro && bebida.esInsumo === true)))
            .finally(() => setLoading(false))
        }else{
            setLoading(true)
            getArticulosInsumo()
            .then(data => setBebidas(data.filter(bebida => bebida.baja === false && bebida.esInsumo === true)))
            .finally(() => setLoading(false))    
        }
    }
    return(
        <header className={navbarBebidas}>
            <button onClick={() => bebidasHandler(null)}>TODOS</button>
            <button onClick={() => bebidasHandler('bebidas con alcohol')}>ALCOHOL</button>
            <button onClick={() => bebidasHandler('bebidas sin gas')}>SIN GAS</button>
            <button onClick={() => bebidasHandler('gaseosas')}>GASEOSAS</button>
        </header>
    )
}