import Modal from 'react-modal'
import styles from './ModalBox.module.css'

interface Props {
    children: JSX.Element
    modalStatus: boolean
    setModalStatus: (v: boolean) => void
}

const ModalBox = ({ children, modalStatus, setModalStatus }: Props): JSX.Element => {
    const closeModal = () => {
        setModalStatus(false)
    }

    return (
        <Modal
            isOpen={modalStatus}
            onRequestClose={closeModal}
            className={styles.modal}
            contentLabel="Modal"
            ariaHideApp={false}
            overlayClassName={styles.modalOverlay}
        >
            {children}
        </Modal>
    )
}

export default ModalBox
