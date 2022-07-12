import {useState, useEffect} from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

import styles from '../../../styles/reportes.module.css'
const {excelButton} = styles
export default function RankingCard({ranking}){
    const [total, setTotal] = useState(0)
    
    useEffect(() => {
        let totalPedidos = 0
        ranking.forEach(articulo => {
            totalPedidos += articulo.cantidadPedidos
        })
        setTotal(totalPedidos)
    },[ranking])
    return(
        <div>
            <ReactHTMLTableToExcel
                    id="test-table-clientes"
                    className={excelButton}
                    table="table-clientes"
                    filename="topClientes"
                    sheet="clientes"
                    buttonText="Descargar Excel"/>

            <table id='table-clientes'>
                <thead>
                    <tr>
                        <th>Puesto</th>
                        <th>Usuario Email</th>
                        <th>N° Pedidos</th>
                    </tr>
                </thead>
                <tbody>
                    {ranking.map((articulo, i) => (
                        <tr key={i}>
                            <td>{(i+1)}</td>
                            <td>{articulo.email}</td>
                            <td>{articulo.cantidadPedidos}</td>
                        </tr>
                    ))}
                        <tr>
                            <td></td>
                            <td>Total: </td>
                            <td>{total}</td>
                        </tr>
                </tbody>
            </table>
        </div>
    )
}