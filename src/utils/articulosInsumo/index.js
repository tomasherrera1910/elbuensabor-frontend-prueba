export function getArticulosInsumo(){
    return fetch(`http://localhost:3001/articulosInsumo`)
            .then(response => response.json())
}
export function getOneArticuloInsumo(id){
    return fetch(`http://localhost:3001/articulosInsumo/${id}`)
            .then(response => response.json())
}
export function postArticuloInsumo(articulo, token){
    return fetch(`http://localhost:3001/articulosInsumo`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(articulo)
    }).then(response => response.json())
}
export function putArticuloInsumo(articuloId, token, articuloEdit){
    return fetch(`http://localhost:3001/articulosInsumo/${articuloId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(articuloEdit)
    }).then(response => response.json())   
}
export function deleteArticuloInsumo(articuloId, token){
    return fetch(`http://localhost:3001/articulosInsumo/${articuloId}`,{
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(() => {})
}