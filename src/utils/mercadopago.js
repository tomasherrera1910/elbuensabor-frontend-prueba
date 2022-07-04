export default function postMercadopago(data){
    return fetch(`http://localhost:3001/mercadopago`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
}