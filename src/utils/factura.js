export function postFactura(data){
    return fetch(`http://localhost:3001/facturas`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
    }
