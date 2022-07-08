import {useState, useEffect} from 'react'

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
        <table>
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
    )
}
