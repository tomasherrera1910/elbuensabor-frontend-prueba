const fetchUrl= process.env.REACT_APP_FETCH_BACKEND

export default function postUser(user) {
    return fetch(`${fetchUrl}/users`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(user)
    }).then(response => response.json())
}