import styles from '@/styles/Modal.module.css';
import commonStyles from '@/styles/Common.module.css';
import Button from '@/component/UI/Button';
import Image from 'next/image';
import { useContext } from 'react';
import { ModalContext } from '@/context/common-context';

const Backdrop = ({children}) => {
    return <div className={styles.backdrop}>{children}</div>
 }

const Modal = ({children}) => {
    const modalContext = useContext(ModalContext);

    const updateRoomInfo = () => {}
    const deleteRoom = () => {}

    return <Backdrop>
            <div className={styles['modal-container']}>
                <div className={styles['modal-header']}>
                    <button className={styles.close} type="button" onClick={modalContext.onClose}>
                    <Image  src="/images/close.png" alt="close" width={32} height={32}/>
                    </button>
                </div>
                <div className={styles['modal-body']}>
                    {children}
                </div>
                <div className={styles['modal-footer']}>
                    <Button className={commonStyles.error} type="button" onClick={deleteRoom}>삭제</Button>
                    <Button type="button" onClick={updateRoomInfo}>수정</Button>
                </div>
            </div>
         </Backdrop>
}

export default Modal;