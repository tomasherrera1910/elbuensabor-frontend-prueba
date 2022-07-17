const fetchUrl= process.env.REACT_APP_FETCH_BACKEND

export default function getUsers(){
    return fetch(`${fetchUrl}/users`)
    .then(response => response.json())
}