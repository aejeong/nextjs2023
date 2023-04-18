import LabelWithInput from '@/component/LabelWithInput';
import Modal from './UI/Modal/Modal';
import ReactDOM from 'react-dom';
import { useEffect, useRef, useContext } from 'react';
import { ModalContext } from '@/context/common-context';

const ModalWithInput = ({data}) => {
    const roomNameRef = useRef(null);
    const attendantRef = useRef(null);

    useEffect(()=>{
        return () => {};
    });

    return ReactDOM.createPortal(<Modal>
        <LabelWithInput text="방 이름" inputData={{id:'roomName',type:"text",maxLength:'10',defaultValue:data.roomName, ref:roomNameRef}} />
        <LabelWithInput text="방 인원" inputData={{id:'attendant',type:"number", min:'1', max:'5', defaultValue: data.attendant, ref:attendantRef}}/>
    </Modal>, document.getElementById('portal'))

}

export default ModalWithInput;