export function getRanking(urlParam, fechaDesde, fechaHasta){
    return fetch(`http://localhost:3001/reportes/${urlParam}/${fechaDesde}/${fechaHasta}`)
    .then(response => response.json())
}