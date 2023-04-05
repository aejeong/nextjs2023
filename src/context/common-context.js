import React from 'react';

export const ModalContext = React.createContext({
    isActive : false,
    onClose: ()=>{}
});

export const CreateRoomUIContext = React.createContext({
    isActive : false,
    onClick: () => {}
});