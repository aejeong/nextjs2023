import styles from '@/styles/List.module.css';
import layoutStyles from '@/styles/Layout.module.css'
import Button from '../../component/UI/Button';
import ModalWithInput from '@/component/ModalWithInput';
import LabelWithInput from '@/component/LabelWithInput';
import { useState, useContext, useRef, useEffect } from 'react'; 
import { ModalContext, CreateRoomUIContext } from '@/context/common-context';
import BottomAreaLayout from '@/component/layout/BottomAreaLayout';
import { getSession, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRoomEditor } from '@/hooks/roomHooks';
import { getRandomAttendants, getRandomRole } from '@/lib/common';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

function Rooms() {
    const router = useRouter();
    const {updateRoomInfo, replaceItem ,deleteRoomInfo} = useRoomEditor();
    const {data: session, update} = useSession();

    const roomUIContext = useContext(CreateRoomUIContext);
    const roomNameRef = useRef(null);
    const attendantRef = useRef(null);
    const [openRoomEditModal, setOpenRoomEditModal] = useState({
        currentItem: null,
        isOpen: false
    });

    useEffect(()=>{
        getSession().then(currentSession=>{
            if(!currentSession){
                router.replace('/')
            }else{
                update({...currentSession})
            }
        })
    },[])


    const ItemList = () => {
        if(!session){
            return;
        }
    
    const { roomItems } = session.user;
    if(roomItems && roomItems.length){
        return roomItems.map((item, idx)=>{
            return(
            <li key={item.id} className={styles.item}>
                 <Link className={styles['item-link']} href={{
                     pathname:`/rooms/${item.id}`,
                     query: {roomName: item.roomName, attendant: item.attendant}
                 }}>
                 <span className={styles['item-name']}>{item.roomName}</span>
                 <Button className={styles['item-edit']} type="button" onClick={(event)=>
                    {
                    event.preventDefault();
                    event.stopPropagation();
                    setOpenRoomEditModal({isOpen:true, currentItem:item})
                    }
                }>수정</Button>
                 </Link>
            </li>
            )
        })
        }else{
            return <p style={{color:'white'}}>Nothing in list</p>
        }
    }

    const createRoomId = () => {
        return uuidv4();
    }

    const formHandler = async (event) => {
        event.preventDefault();
        const roomName = roomNameRef.current.value;
        const attendant = attendantRef.current.value;

        if(roomName === '' && attendant === '' ){
            return;
        }

        const roomId = createRoomId()
        const randomAttendants = [];

        for(let i = 1; i < Number(attendant); i++){
            randomAttendants.push({
                ...getRandomAttendants(),
                role: getRandomRole()
            })
        }

        if(session){
            updateRoomInfo({id:roomId,roomName, attendant, chats:[], randomAttendants})
            roomUIContext.onClose();
        }
    }

    const editRoomModalHandler = async (params) => {
        const editRoomItems = params.reduce(({props:accProps},{props:currProps},idx) => {
            const {inputData : accData} = accProps;
            const {inputData: currData} = currProps
            const {ref: {current: accInput}}= accData;
            const {ref: {current: currInput}}= currData;

            return {
                [accData.id]: accData.defaultValue !== accInput.value ? accInput.value : accData.defaultValue,
                [currData.id]:currData.defaultValue !== currInput.value ? currInput.value : currData.defaultValue
            }
        })

            const {roomName, attendant} = editRoomItems;
            const item = {
                id: openRoomEditModal.currentItem.id,
                roomName,
                attendant,
                chats:[]
            }

            replaceItem(item)

            setOpenRoomEditModal({
                isOpen: false,
                currentItem: item
            })
    }

    const roomListWithModalComponent =  <ModalContext.Provider 
    value={{
        isActive : openRoomEditModal.isOpen, 
    onClose: ()=>{
        setOpenRoomEditModal({isOpen:false, currentItem: openRoomEditModal.currentItem})
    },
    onEdit: (params)=>{editRoomModalHandler(params)},
    onDelete: ()=>{
        deleteRoomInfo(openRoomEditModal.currentItem.id)
        setOpenRoomEditModal({
            isOpen: false,
            currentItem: null
        })
    }
    }}>
    <ul className={styles['room-list']}>
        {
            <ItemList />
        }
      </ul>
      <BottomAreaLayout />
      {openRoomEditModal.isOpen && <ModalWithInput data={openRoomEditModal.currentItem}/>}
    </ModalContext.Provider>

    const roomCreateInputComponent = <main className={layoutStyles.main}>
        <form onSubmit={formHandler}>
            <LabelWithInput text="방 이름" inputData={{id:'roomName',type:"text",maxLength:'10', ref:roomNameRef}}/>
            <LabelWithInput text="방 인원" inputData={{id:'attendant',type:"number", min:'1', max:'5', ref:attendantRef}}/>
            <BottomAreaLayout />
        </form>
    </main>

    return(
        roomUIContext.isActive ? roomCreateInputComponent : roomListWithModalComponent
    )
}



export default Rooms;


