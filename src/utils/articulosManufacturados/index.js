export function getArticulosManufacturados(){
    return fetch(`http://localhost:3001/articulosManufacturados`)
           .then(response => response.json())
}
export function postArticulosManufacturados(articulo, token){
    return fetch(`http://localhost:3001/articulosManufacturados`,{
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(articulo)
    }).then(response => response.json())
}
export function postArticuloDetalle(idPlato, token, ingrediente){
    return fetch(`http://localhost:3001/articulosManuDetalle/${idPlato}`,{
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(ingrediente)
    }).then(response => response.json())
}
export function deleteArticuloDetalle(token, idArtDetalle){
    return fetch(`http://localhost:3001/articulosManuDetalle/${idArtDetalle}`,{
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => response.json())
}