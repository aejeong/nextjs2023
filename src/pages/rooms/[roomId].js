import styles from '../../styles/Chat.module.css';
import BottomAreaLayout from '@/component/layout/BottomAreaLayout';
import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { ROLE } from '@/constant';
import { useChat } from '@/hooks/roomHooks';
import Image from 'next/image';

const RoomPage = () => {
    const { chatList, sendingMessage, chatStatus, rooms} = useChat();

    const chatRef = useRef(null);
    const [timeId, setTimeId] = useState(null);


    const formHandler = async(event) => {
        event.preventDefault();
        const userMessage = chatRef?.current?.value;

        if(userMessage === ''){
            return;
        }

        const result = await sendingMessage(ROLE.USER,userMessage);
        if(result && Number(rooms.current.attendant) > 2 ){
            setTimeId(prevTimeId=> chatStatus.timeCheck(prevTimeId ?? null));
        }
    }

    const getResponseMessage = () => {
        return sendingMessage(null, chatStatus.currentMessage)
    }

    useEffect(()=>{
             // 시간 체크
        if(chatStatus.botRound && chatList.length > 1){

        (async()=>{
            const result = await getResponseMessage();
            if(result){
                setTimeId((prevTimeId) => chatStatus.timeCheck(prevTimeId));
            }
        })().then();
        }

        return () => {
            clearTimeout(timeId);
        }
    },[chatStatus.botRound])


    const MessageComponent =  ({item: {profileType, message, direction}}) => (
        <div className={`${styles['profile-container']} ${styles[`${direction}`]}`}>
        <div className={styles['profile-box']}>
            <div className={styles['image-box']}>
                <Image src={profileType.imgPath} width="54" height="54" alt="user-porofile"/>
            </div>
            <span className={styles.name}>{profileType.name}</span>
        </div>
   
        <p className={styles['chat-bubble']}>
            {message}
        </p>
    </div>
      )


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
