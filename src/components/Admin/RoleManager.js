import { useEffect, useState } from 'react'
import { NotFound } from "../NotFound";
import getUsers from '../../utils/users/getUsers'
import editRole from '../../utils/users/editRole';

import styles from '../../styles/admin.module.css'
const{container, sectionGrid, headerGrid, select} = styles
export default function RoleManager(){
    const [usuario,] = useState(JSON.parse(window.localStorage.getItem('userLoggedBuenSabor')))
    const [usuarios, setUsuarios] = useState([])
    const [search, setSearch] = useState('')
    const [rol, setRol] = useState({rol:''})
    
    useEffect(() => {
        getUsers()
        .then(data => setUsuarios(data.filter(user => user.email.toLowerCase().includes(search.toLowerCase()))))
    },[search])
    useEffect(() => {
        if(rol['id'])
        editRole(rol['id'], rol)
    },[rol])

    const handlerSearch = e => {
        setSearch(e.target.value)
    }
    const rolHandler = (e, id) => {
        setRol({rol:e.target.value,
                id})
    }
    return(
        <div className={container}>
            {usuario?.rol === 'admin'
            ?
            <div>
            <form>
                <input type='text' placeholder='Buscar usuario por email...' value={search} onChange={handlerSearch}/>
            </form>
            <section className={headerGrid}>
                    <p>Email</p><p>ROL</p>
            </section>
                {usuarios?.map(usuario => (
                    <section key={usuario.id} className={sectionGrid}>
                        <p>{usuario.email}</p>
                        <p><select className={select} defaultValue={usuario.rol} onChange={e => {rolHandler(e, usuario.id)}}>
                            <option value='usuario'>Usuario</option>    
                            <option value='cajero'>Cajero</option>    
                            <option value='cocinero'>Cocinero</option>    
                            <option value='admin'>Admin</option>    
                        </select></p>
                    </section>
                    ))}
            </div>
            :
            <NotFound/>
            }
        </div>
    )
}