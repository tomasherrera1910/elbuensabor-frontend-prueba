import {useState, useEffect} from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

import styles from '../../../styles/reportes.module.css'
const {excelButton} = styles
export default function RankingCard({ranking}){

    const [total, setTotal] = useState(0)
    
    useEffect(() => {
        let totalPedidos = 0
        ranking.forEach(articulo => {
            totalPedidos += articulo.cantidadPedida
        })
        setTotal(totalPedidos)
    },[ranking])
    return(
        <div>
            <ReactHTMLTableToExcel
                    id="test-table-comidas"
                    className={excelButton}
                    table="table-comidas"
                    filename="topComidas"
                    sheet="comidas"
                    buttonText="Descargar Excel"/>

            <table id='table-comidas'>
                <thead>
                    <tr>
                        <th>Puesto</th>
                        <th>Comida</th>
                        <th>Veces Pedida</th>
                    </tr>
                </thead>
                <tbody>
                    {ranking.map((articulo, i) => (
                        <tr key={i}>
                            <td>{(i+1)}</td>
                            <td>{articulo.comida}</td>
                            <td>{articulo.cantidadPedida}</td>
                        </tr>
                    ))}
                        <tr>
                            <td></td>
                            <td>Comidas Realizadas: </td>
                            <td>{total}</td>
                        </tr>
                </tbody>
            </table>
        </div>
    )
}