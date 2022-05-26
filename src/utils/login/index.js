export default function validateLogin(usuario){
    return fetch(`http://localhost:3001/login`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(usuario)
    }).then(response => response.json())
}