export default function postUser(user) {
    return fetch(`http://localhost:3001/users`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(user)
    }).then(response => response.json())
}