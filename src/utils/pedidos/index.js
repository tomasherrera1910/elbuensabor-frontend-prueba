//DETALLE PEDIDOS
export function getPedidoDetalle(id){
    return fetch(`http://localhost:3001/pedidosDetalle/${id}`)
    .then(response => response.json())
}
export function postPedidoDetalle(token, pedidoDetalle){
    return fetch(`http://localhost:3001/pedidosDetalle`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(pedidoDetalle)
    }).then(response => response.json())
}
export function putPedidoDetalle(id,  token, cantidad){
    return fetch(`http://localhost:3001/pedidosDetalle/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(cantidad)
    }).then(response => response.json())
}
export function deletePedidoDetalle(pedidoDetalleId){
    return fetch(`http://localhost:3001/pedidosDetalle/${pedidoDetalleId}`,{
        method: 'DELETE'
    }).then(() => {})
}

//PEDIDOS
export function getPedidoXusuario(id){
    return fetch(`http://localhost:3001/pedidos/usuario/${id}`)
        .then(response => response.json())
}

export function getPedidos(token, estado){
    return fetch(`http://localhost:3001/pedidos/${estado}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }).then(response => response.json())
}
export function getPedidoStock(pedidoId){
    return fetch(`http://localhost:3001/pedidos/stockPedido/${pedidoId}`)
            .then(response => response.json())
}

export function postPedido(token, pedido){
    return fetch(`http://localhost:3001/pedidos`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(pedido)
    }).then(response => response.json())
}

export function putPedido(token, pedidoId, data){
    return fetch(`http://localhost:3001/pedidos/${pedidoId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
}