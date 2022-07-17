const fetchUrl= process.env.REACT_APP_FETCH_BACKEND 

export default function editRole(id, rol){
    return fetch(`${fetchUrl}/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(rol)
    }).then(response => response.json())
}