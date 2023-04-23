import styles from '../../styles/Layout.module.css';
import { useRouter } from 'next/router'; 
import dynamic from 'next/dynamic';
import React, { useContext } from 'react';
import {PATH} from '@/constant';
import { CreateRoomUIContext } from '@/context/common-context';


const HeaderLayout = ({onClick}) => {
    const roomUIContext = useContext(CreateRoomUIContext);
    const router = useRouter();


    const componentPath = {
        [PATH.HOME] : null,
        [PATH.ROOMS] : (()=> {
            const DefaultComponent = dynamic(()=> import('../UI/Header').then(module=> module.DefaultComponent))
            return <DefaultComponent onClick={roomUIContext.onClick} />
        })(),
        [PATH.ROOM_DETAIL] : (()=>{
            const RoomComponent = dynamic(()=> import('../UI/Header').then(module=> module.RoomComponent))
            return <RoomComponent onClick={onClick} roomName={router.query.roomName}/>
        })()
    }

    return(
        <header className={styles['header-layout']}>
            {componentPath[router.pathname]}
        </header>
    );
}

export default HeaderLayout;