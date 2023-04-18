import styles from '../../styles/Chat.module.css';
import {useRouter} from 'next/router';
import BottomAreaLayout from '@/component/layout/BottomAreaLayout';
import { requestChat } from '../api/openai';
import { useEffect, useRef, useState } from 'react';
import { ModalContext } from '@/context/common-context';
import { getSession, useSession } from 'next-auth/react';
import { PROFILE_TYPE } from '@/constant';

const RoomPage = () => {
    const router = useRouter();

    const {data: session , update} = useSession();
    const [chatList, setChatList] = useState([]);
    const [isListUpdated, setIsListUpdated] = useState(false);
    const [isFirstAttempt, setIsFirstAttempt] = useState(true);
    const chatRef = useRef(null);


    const formHandler = async (event) => {
        event.preventDefault();
        const currentMessage = chatRef.current.value;

        if(currentMessage === ''){
            return;
        }

        setChatList([
            ...chatList,
            {
                profileType: PROFILE_TYPE.USER,
                message: currentMessage,
                direction: 'left'
            }
        ])

        try{

            setChatList(prevChat=> [
                ...prevChat,
                {
                    profileType: PROFILE_TYPE.WAITING,
                    message: 'Waiting...',
                    direction: 'right'
                }
            ])

            const result = await requestChat(currentMessage);
            if(!result.error){
                const {choices} = result;

                console.log(choices,'---chod')

                setChatList(prevChat=> {
                    prevChat.pop()
                    return (
                        [
                            ...prevChat,
                            {
                                profileType: PROFILE_TYPE.BOT_1,
                                // message: choices[0].message.content,
                                message: choices[0].text,
                                direction: 'right'
                            }
                        ]
                    )
                })

                setIsListUpdated(true)
            }
        }catch(error){
            console.log(error)
            setIsListUpdated(false);
        }
    }


    useEffect(()=> {
        if(session && isFirstAttempt){
            const roomIndex = session.user.roomItems.findIndex(item=> {
                return item.id === Number(router.query.roomId)
            })
            if(session.user.roomItems[roomIndex].chats.length > 0){
                setChatList([...session.user.roomItems[roomIndex].chats])
            }
            return setIsFirstAttempt(false)
        }
        
        if(session && isListUpdated){
            // 업데이트될 세션있을때
            const currentRoom = session.user.roomItems.filter(item=> {
                return item.id === Number(router.query.roomId)
            })
       
            currentRoom[0].chats = chatList;

            const storeChats = {
                ...session.user,
                roomItems : [...session.user.roomItems]
            }
            async function updateChatList(){
               return await update({user: storeChats});
            }
            updateChatList();
        }

        return () => {
            setIsListUpdated(false)
        }
    },[chatList])

    const MessageComponent = ({item: {profileType, message, direction}}) => {
      return(
        <div className={`${styles['profile-container']} ${styles[`${direction}`]}`}>
        <div className={styles['profile-box']}>
            <div className={styles['image-box']}>
                <img src={profileType.imgPath} alt="user-porofile"/>
            </div>
            <span className={styles.name}>{profileType.name}</span>
        </div>
   
        <p className={styles['chat-bubble']}>
            {message}
        </p>
    </div>
      )
    }

            return <form onSubmit={formHandler}>
            <main className={styles.main}>
        <div className={styles['message-container']}>
            {
              chatList.length > 0 && chatList.map((chat,idx)=>{
                    return <MessageComponent key={idx} item={chat}/>
                })
            }
        </div>
        <BottomAreaLayout inputData={{id:'sendMsg',type:"text", placeholder:"메세지를 입력해주세요.", ref:chatRef}}/>
        </main>
        </form>

}

export default RoomPage;
