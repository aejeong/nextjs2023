import styles from '../../styles/List.module.css';
import layoutStyles from '@/styles/Layout.module.css'
import Button from '../../component/UI/Button';
import ModalWithInput from '@/component/ModalWithInput';
import LabelWithInput from '@/component/LabelWithInput';
import { useState, useContext, useRef, useEffect, useMemo } from 'react'; 
import { ModalContext, CreateRoomUIContext } from '@/context/common-context';
import BottomAreaLayout from '@/component/layout/BottomAreaLayout';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { checkRoomItemIndex } from '@/lib/common'; 

function Rooms() {
    const router = useRouter();
    const {data: session , update, status} = useSession();

    console.log(session,'session from rooms')

    useEffect(()=> {
        getSession().then(session=>{
            if(status !== 'authenticated' || !session){
               return router.replace('/')
            }
        })
    },[])

    const roomUIContext = useContext(CreateRoomUIContext);
    const roomNameRef = useRef(null);
    const attendantRef = useRef(null);
    const [openRoomEditModal, setOpenRoomEditModal] = useState({
        currentItem: null,
        isOpen: false
    });


    const ItemList = () => {
    if(!session){
        return;
    }
    const { user : { roomItems } } = session;
    if(status === 'authenticated' && roomItems.length){
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
        const randomId = Math.floor(Math.random() * 10)+1;
        const hasId = session.user.roomItems.findIndex(item=>{
           item.id === randomId
        })
        if(hasId > 0){
            return Math.floor(Math.random() * 45)+1;
        }else{
            return randomId;
        }
    }

    const formHandler = async (event) => {
        event.preventDefault();
        const roomName = roomNameRef.current.value;
        const attendant = attendantRef.current.value;
        const roomId = createRoomId()

        if(session){
            const newSession = {
                ...session.user,
                roomItems : [...session.user.roomItems, {id:roomId,roomName, attendant, chats:[]}]
            }
            await update({user: newSession});
            roomUIContext.isActive = false;
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

            session.user.roomItems.splice(checkRoomItemIndex(),1,item)

            const updateRoomInfo = {
                ...session.user,
                roomItems : [...session.user.roomItems]
            }
            await update({user: updateRoomInfo});
            setOpenRoomEditModal({
                isOpen: false,
                currentItem: item
            })
    }

    const checkRoomItemIndex = () => {
       return session.user.roomItems.findIndex(item=> {
            return item.id === openRoomEditModal.currentItem.id
        })
    }

    const onDeleteChatRoom = async ()=>{
        session.user.roomItems.splice(checkRoomItemIndex(),1)
        const updateRoomInfo = {
            ...session.user,
            roomItems : [...session.user.roomItems]
        }
        await update({user: updateRoomInfo});
        setOpenRoomEditModal({
            isOpen: false,
            currentItem: null
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
        console.log('from index')
        onDeleteChatRoom()
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


