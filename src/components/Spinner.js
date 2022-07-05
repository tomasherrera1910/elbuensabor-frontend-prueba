import styles from '../styles/spinner.module.css'
const {loader, loaderContainer} = styles
export default function Spinner(){
    return(
    <div className={loaderContainer}>
    <div className={loader}></div>
    </div>
    )
}