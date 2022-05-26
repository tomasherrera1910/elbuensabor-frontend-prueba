import styles from '../styles/modal.module.css'
const {modalSize,closeButton, modalContent} = styles

export function Modal({children, onClose, modal}){
    return(
        <dialog open={modal} className={modalSize}>
            <div className={modalContent}>
            <button onClick={onClose} className={closeButton}>X</button>
            {children}
            </div>
        </dialog>
    )

}