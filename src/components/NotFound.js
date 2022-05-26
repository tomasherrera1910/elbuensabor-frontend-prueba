import styles from '../styles/notFound.module.css'
const {container} = styles

export function NotFound(){
    return(
        <div className={container}>
            <h1>PÁGINA NO ENCONTRADA</h1>
            <h2>ERROR 404</h2>
        </div>
    )
}