import styles from '../../styles/Layout.module.css';
import { useRouter } from 'next/router'; 
import dynamic from 'next/dynamic';
import React, { useContext } from 'react';
import {path} from '@/constant';
import { CreateRoomUIContext } from '@/context/common-context';


const HeaderLayout = ({onClick}) => {
    const roomUIContext = useContext(CreateRoomUIContext);
    const router = useRouter();

    const componentPath = {
        [path.HOME] : null,
        [path.ROOMS] : (()=> {
            const DefaultComponent = dynamic(()=> import('../UI/Header').then(module=> module.defaultComponent))
            return <DefaultComponent onClick={roomUIContext.onClick}/>
        })(),
        [path.ROOM_DETAIL] : (()=>{
            const RoomComponent = dynamic(()=> import('../UI/Header').then(module=> module.roomComponent))
            return <RoomComponent onClick={onClick} roomName='넘블모여라'/>
        })()
    }

    return(
        <header className={styles['header-layout']}>
            {componentPath[router.pathname]}
        </header>
    );
}

export default HeaderLayout;