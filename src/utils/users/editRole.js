export default function editRole(id, rol){
    return fetch(`http://localhost:3001/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(rol)
    }).then(response => response.json())
}