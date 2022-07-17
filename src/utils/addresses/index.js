const fetchUrl= process.env.REACT_APP_FETCH_BACKEND

export function getAddress(userId){
    return fetch(`${fetchUrl}/addresses/${userId}`)
           .then(response => response.json())
}
export function postAddress(address, token){
    return fetch(`${fetchUrl}/addresses`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(address)
    }).then(response => response.json())
}
export function deleteAddress(addressId){
    return fetch(`${fetchUrl}/addresses/${addressId}`,{
        method: 'DELETE'
    }).then(() => {})
}
