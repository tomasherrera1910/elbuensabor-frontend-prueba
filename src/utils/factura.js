const fetchUrl= process.env.REACT_APP_FETCH_BACKEND

export function postFactura(data){
    return fetch(`${fetchUrl}/facturas`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
    }
