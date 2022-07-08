import {useState, useEffect} from 'react'
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
        <table>
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
    )
}