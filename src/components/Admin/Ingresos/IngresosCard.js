import {useState, useEffect} from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

import styles from '../../../styles/reportes.module.css'
const {excelButton} = styles
export default function IngresosCard({ingresos}){
    const [total, setTotal] = useState(0)
    
    useEffect(() => {
        let totalPedidos = 0
        ingresos.forEach(ingreso => {
            totalPedidos += ingreso.ingresos
        })
        setTotal(totalPedidos)
    },[ingresos])
    return(
        <div>
            <ReactHTMLTableToExcel
                    id="test-table-ingresos"
                    className={excelButton}
                    table="table-ingresos"
                    filename="ingresos"
                    sheet="ingresos"
                    buttonText="Descargar Excel"/>

            <table id='table-ingresos'>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Ingresos</th>
                    </tr>
                </thead>
                <tbody>
                    {ingresos.map((ingreso, i) => (
                        <tr key={i}>
                            <td>{ingreso.fecha}</td>
                            <td>${ingreso.ingresos}</td>
                        </tr>
                    ))}
                        <tr>
                            <td>Ingresos totales: </td>
                            <td>${total}</td>
                        </tr>
                </tbody>
            </table>
        </div>
    )
}
