export default function getUsers(){
    return fetch(`http://localhost:3001/users`)
    .then(response => response.json())
}