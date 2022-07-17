const fetchUrl= process.env.REACT_APP_FETCH_BACKEND

export function getRanking(urlParam, fechaDesde, fechaHasta){
    return fetch(`${fetchUrl}/reportes/${urlParam}/${fechaDesde}/${fechaHasta}`)
    .then(response => response.json())
}