import styles from '../../styles/List.module.css';
import layoutStyles from '@/styles/Layout.module.css'
import Button from '../../component/UI/Button';
import ModalWithInput from '@/component/ModalWithInput';
import LabelWithInput from '@/component/LabelWithInput';
import { useState, useContext } from 'react'; 
import { ModalContext, CreateRoomUIContext } from '@/context/common-context';

const Rooms = () => {
    const roomUIContext = useContext(CreateRoomUIContext);
    
    const [openRoomModal, setOpenRoomModal] = useState(false);
    const onClose = () => {
        setOpenRoomModal(false)
    }

    const roomListComponent =  <ModalContext.Provider value={{isActive : openRoomModal, onClose: onClose}}>
    <ul className={styles['room-list']}>
          <li className={styles.item}>
              <span className={styles['item-name']}>넘블 모여라</span>
              <Button className={styles['item-edit']} type="button" onClick={()=>setOpenRoomModal(true)}>수정</Button>
          </li>
          <li className={styles.item}>
              <span className={styles['item-name']}>넘블 모여라</span>
              <Button className={styles['item-edit']} type="button" onClick={()=>setOpenRoomModal(true)}>수정</Button>
          </li>
          <li className={styles.item}>
              <span className={styles['item-name']}>넘블 모여라</span>
              <Button className={styles['item-edit']} type="button" onClick={()=>setOpenRoomModal(true)}>수정</Button>
          </li>
      </ul>
      {openRoomModal && <ModalWithInput/>}
    </ModalContext.Provider>

    const roomCreateInputComponent = <main className={layoutStyles.main}>
    <LabelWithInput text="방 이름" inputData={{id:'roomName',type:"text",maxLength:'10' }}/>
    <LabelWithInput text="방 인원" inputData={{id:'attendant',type:"number", min:'1', max:'5'}}/>
    </main>

    return(
        roomUIContext.isActive ? roomCreateInputComponent : roomListComponent
    )
}

export default Rooms;