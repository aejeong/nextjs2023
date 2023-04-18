import HeaderLayout from './HeaderLayout'
import React, {useState ,useEffect, useRef} from 'react';
import { CreateRoomUIContext } from '@/context/common-context';

const Layout = ({children}) => {
    console.log('layout')
    const [roomUIState, setRoomUIState] = useState(false);

    const openNewRoomUI = () => {
     setRoomUIState(prev => !prev);
    }

    return(
        <CreateRoomUIContext.Provider value={{isActive: roomUIState, onClick:openNewRoomUI}}>
            <HeaderLayout/>
            { children }
        </CreateRoomUIContext.Provider>
    );
}

export default React.memo(Layout);