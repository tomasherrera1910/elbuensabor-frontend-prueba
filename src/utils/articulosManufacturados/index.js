const fetchUrl= process.env.REACT_APP_FETCH_BACKEND

export function getArticulosManufacturados(){
    return fetch(`${fetchUrl}/articulosManufacturados`)
           .then(response => response.json())
}
export function getOneArticuloManufacturado(id){
    return fetch(`${fetchUrl}/articulosManufacturados/${id}`)
           .then(response => response.json())
}
export function postArticulosManufacturados(articulo, token){
    return fetch(`${fetchUrl}/articulosManufacturados`,{
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(articulo)
    }).then(response => response.json())
}
export function putArticuloManufacturado(articuloId, token, articuloEdit){
    return fetch(`${fetchUrl}/articulosManufacturados/${articuloId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(articuloEdit)
    })
    .then(response => response.json())  
}
export function deleteArticuloManufacturado(articuloId, token, setArticulos, setLoading){
    return fetch(`${fetchUrl}/articulosManufacturados/${articuloId}`,{
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(() => updateArticulosState(setArticulos, setLoading))
}
//ARTICULOS MANUFACTURADOS DETALLE (INGREDIENTES DEL PLATO)
export function postArticuloDetalle(idPlato, token, ingrediente){
    return fetch(`${fetchUrl}/articulosManuDetalle/${idPlato}`,{
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(ingrediente)
    }).then(response => response.json())
}
export function deleteArticuloDetalle(token, idArtDetalle){
    return fetch(`${fetchUrl}/articulosManuDetalle/${idArtDetalle}`,{
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

//para setear los articulos en pantalla despues de agregarlos en la interfaz admin
export function updateArticulosState(setArticulos, setLoading){
        setLoading(true)
        getArticulosManufacturados()
        .then(data => setArticulos(data.filter(articulo => articulo.baja === false)))
        .finally(() => setLoading(false))
}