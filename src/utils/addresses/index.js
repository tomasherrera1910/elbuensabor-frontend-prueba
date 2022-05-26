export function getAddress(userId){
    return fetch(`http://localhost:3001/addresses/${userId}`)
           .then(response => response.json())
}
export function postAddress(address, token){
    return fetch(`http://localhost:3001/addresses`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(address)
    }).then(response => response.json())
}
export function deleteAddress(addressId){
    return fetch(`http://localhost:3001/addresses/${addressId}`,{
        method: 'DELETE'
    }).then(() => {})
}
