const fetchUrl= process.env.REACT_APP_FETCH_BACKEND

export default function validateLogin(usuario){
    return fetch(`${fetchUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(usuario)
    }).then(response => response.json())
}