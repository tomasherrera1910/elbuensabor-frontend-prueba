const fetchUrl= process.env.REACT_APP_FETCH_BACKEND

export function getArticulosInsumo(){
    return fetch(`${fetchUrl}/articulosInsumo`)
            .then(response => response.json())
}
export function getOneArticuloInsumo(id){
    return fetch(`${fetchUrl}/articulosInsumo/${id}`)
            .then(response => response.json())
}
export function postArticuloInsumo(articulo, token){
    return fetch(`${fetchUrl}/articulosInsumo`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(articulo)
    }).then(response => response.json())
}
export function putArticuloInsumo(articuloId, token, articuloEdit){
    return fetch(`${fetchUrl}/articulosInsumo/${articuloId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(articuloEdit)
    }).then(response => response.json())   
}
export function deleteArticuloInsumo(articuloId, token){
    return fetch(`${fetchUrl}/articulosInsumo/${articuloId}`,{
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(() => {})
}