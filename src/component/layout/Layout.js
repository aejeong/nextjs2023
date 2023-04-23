import HeaderLayout from './HeaderLayout'
import React, {useState} from 'react';
import { CreateRoomUIContext } from '@/context/common-context';

const Layout = ({children}) => {
    const [roomUIState, setRoomUIState] = useState(false);

    const openNewRoomUI = () => {
     setRoomUIState(prev => !prev);
    }

    const closeRoomUI = () => {
        setRoomUIState(false)
    }

    return(
        <CreateRoomUIContext.Provider value={{isActive: roomUIState, onClick:openNewRoomUI, onClose: closeRoomUI}}>
            <HeaderLayout/>
            { children }
        </CreateRoomUIContext.Provider>
    );
}

export default React.memo(Layout);