import {useState, useEffect} from 'react'

export default function GananciasCard({ganancias}){
    const [total, setTotal] = useState(0)
    
    useEffect(() => {
        let totalGanancias = 0
        ganancias.forEach(ganancia => {
            totalGanancias += (ganancia.ingresos || 0) - (ganancia.gastos || 0)
        })
        setTotal(totalGanancias)
    },[ganancias])
    return(
        <table>
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Ingresos</th>
                    <th>Gastos</th>
                    <th>Ganancias</th>
                </tr>
            </thead>
            <tbody>
                {ganancias.map((ganancia, i) => (
                    <tr key={i}>
                        <td>{ganancia.fecha}</td>
                        <td>${ganancia.ingresos || 0}</td>
                        <td>${ganancia.gastos || 0}</td>
                        <td>${(ganancia.ingresos || 0) - (ganancia.gastos || 0)}</td>
                    </tr>
                ))}
                    <tr>
                        <td></td>
                        <td></td>
                        <td>Ganancias totales: </td>
                        <td>${total}</td>
                    </tr>
            </tbody>
        </table>
    )
}