import { useSession, getSession } from 'next-auth/react';
import { checkRoomItemIndex, deleteItem } from '@/lib/common';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { PROFILE_TYPE, ROLE } from '@/constant';
import { requestChat } from '@/pages/api/openai';
import { getRandomObj } from '@/lib/common';


export const useRoomEditor = () => {
    const {data: session , update } = useSession();
   const updateRoomInfo = async(extraItems) => {
        const updateRoomInfo = {
            ...session.user,
            roomItems : extraItems ? [...session.user.roomItems, {...extraItems}] : [...session.user.roomItems]
        }
        await update({...session, user: updateRoomInfo});
     }

     const replaceItem = (item) => {
        const roomIndex = checkRoomItemIndex(session.user.roomItems, item.id);
        session.user.roomItems.splice(roomIndex,1,item);

        updateRoomInfo();
     }

     const deleteRoomInfo = (currentItem)=>{
        deleteItem(session.user.roomItems,currentItem);
       return updateRoomInfo()
     }
    
    return {
        updateRoomInfo,
        replaceItem,
        deleteRoomInfo
    }
}

const _getRandomBot = (randomAttendants) => {
    const randomKey = getRandomObj(randomAttendants)
    return randomAttendants[randomKey];
}


export const useChat = () => {
    const router =  useRouter();

    const { updateRoomInfo } = useRoomEditor();
    const [chatList, setChatList] = useState([])
    const {data: session, update} = useSession();
    const [rooms,setRooms] = useState({
        current:null,
        index: null
    })

    const checkEstimateTime = () => {
        return setTimeout(()=>{
        setChatStatus(prev=>{
            return {...prev, botRound: true}
        })
          },20000)
     }
     
    const [chatStatus, setChatStatus] = useState({
        hasPreviousChats: false,
        timeCheck: checkEstimateTime,
        botRound: false,
        isListUpdated: false,
        currentMessage: '',
    })

    useEffect(()=>{
        if(router.isReady){
            getSession().then(async currentSession=>{
                if(currentSession){
                    const roomIndex = checkRoomItemIndex(currentSession.user.roomItems,router.query.roomId)
                    const currentRoom = currentSession.user.roomItems[roomIndex];
    
                    setRooms({
                        current: currentRoom, index: roomIndex
                    })
                    if(!chatStatus.hasPreviousChats && currentRoom.chats.length > 0){
                        const { message } = currentRoom.chats[currentRoom.chats.length - 1]
                        setChatList([...currentRoom.chats])
                        return setChatStatus(prev=> {
                            return {...prev, hasPreviousChats: true, currentMessage: message, botRound: Number(currentRoom.attendant) > 2}
                        })
                    }

                    update({...currentSession})
                }             
            })
        }

    },[router.isReady])

    const updateChatList = () => {
        if(chatStatus.isListUpdated){
            session.user.roomItems[rooms.index].chats = chatList;
            updateRoomInfo();

        setChatStatus(prev=> {
            return {...prev, isListUpdated: false}
        })
        }
    }

    // 대화 저장
    useEffect(updateChatList,[chatList])


    const sendingMessage = async (role, incomingMessage) => {

        if(role === ROLE.USER){
         //첫 시작은 user로
         setChatList([
            ...chatList,
            {
                profileType: PROFILE_TYPE.USER,
                message: incomingMessage,
                direction: 'right'
            }
        ])
        }
   
        try{

            setChatList(prevChat=> {
                return ([
                    ...prevChat,
                    {
                        profileType: PROFILE_TYPE.WAITING,
                        message: 'Waiting...',
                        direction: 'left'
                    }
                ])
            })

            const randomBot = _getRandomBot(rooms.current.randomAttendants);
            
            const result = await requestChat({model:randomBot.model,message: incomingMessage});
          
            if(!result.error){
                    const {choices} = result;
    
                    setChatList(prevChat=> {
                        prevChat.pop()
                        return (
                            [
                                ...prevChat,
                                {
                                    profileType: randomBot,
                                    // message: choices[0].message.content,
                                    message: choices[0].text === '' ? 'I lost my words' : choices[0].text,
                                    direction: 'left'
                                }
                            ]
                        )
                    })

                setChatStatus(prev=> {
                     return { 
                         ...prev, 
                         currentMessage: choices[0].text, 
                         isListUpdated: true,
                         botRound: false
                     }
                 })

                 return true;
        }
        }catch(error){
            setChatStatus(prev=> {
                return {...prev, isListUpdated: false, botRound: false, currentMessage: '' }
            })
            return false;
        }
    }

    return {
        chatList,
        chatStatus,
        rooms,
        sendingMessage
    }
}
