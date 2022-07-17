const fetchUrl= process.env.REACT_APP_FETCH_BACKEND 

//DETALLE PEDIDOS
export function getPedidoDetalle(id){
    return fetch(`${fetchUrl}/pedidosDetalle/${id}`)
    .then(response => response.json())
}
export function postPedidoDetalle(token, pedidoDetalle){
    return fetch(`${fetchUrl}/pedidosDetalle`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(pedidoDetalle)
    }).then(response => response.json())
}
export function putPedidoDetalle(id,  token, cantidad){
    return fetch(`${fetchUrl}/pedidosDetalle/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(cantidad)
    }).then(response => response.json())
}
export function deletePedidoDetalle(pedidoDetalleId, setLoading){
    return fetch(`${fetchUrl}/pedidosDetalle/${pedidoDetalleId}`,{
        method: 'DELETE'
    }).then(() => setLoading(false))
}

//PEDIDOS
export function getPedidoXusuario(id){
    return fetch(`${fetchUrl}/pedidos/usuario/${id}`)
        .then(response => response.json())
}

export function getPedidos(token, estado){
    return fetch(`${fetchUrl}/pedidos/${estado}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }).then(response => response.json())
}
export function getPedidoStock(pedidoId){
    return fetch(`${fetchUrl}/pedidos/stockPedido/${pedidoId}`)
            .then(response => response.json())
}

export function postPedido(token, pedido){
    return fetch(`${fetchUrl}/pedidos`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(pedido)
    }).then(response => response.json())
}

export function putPedido(token, pedidoId, data){
    return fetch(`${fetchUrl}/pedidos/${pedidoId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
}
export function deletePedido(pedidoId){
    return fetch(`${fetchUrl}/pedidos/${pedidoId}`,{
        method: 'DELETE'
    })
}