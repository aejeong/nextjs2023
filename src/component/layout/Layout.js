import HeaderLayout from './HeaderLayout'
import BottomAreaLayout from './BottomAreaLayout';
import React, {useState} from 'react';
import { CreateRoomUIContext } from '@/context/common-context';

const Layout = ({children}) => {
    const [roomUIState, setRoomUIState] = useState(false);

    const openNewRoomUI = () => {
     setRoomUIState(prev => !prev);
    }

    return(
        <CreateRoomUIContext.Provider value={{isActive: roomUIState, onClick:openNewRoomUI}}>
        <HeaderLayout/>
        {children}
        <BottomAreaLayout/>
        </CreateRoomUIContext.Provider>
    );
}

export default Layout;