import React from 'react';

export const ModalContext = React.createContext({
    isActive : false,
    onClose: ()=>{},
    onDelete: ()=>{},
    onEdit: ()=> {},
    data: {}
});

export const CreateRoomUIContext = React.createContext({
    isActive : false,
    onClick: ()=>{},
    onClose: ()=>{}
});