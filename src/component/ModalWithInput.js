import LabelWithInput from '@/component/LabelWithInput';
import Modal from './UI/Modal/Modal';
import ReactDOM from 'react-dom';
import { useEffect } from 'react';
const ModalWithInput = () => {
    useEffect(()=>{
        return () => {};
    });

    return ReactDOM.createPortal(<Modal>
        <LabelWithInput text="방 이름" inputData={{id:'roomName',type:"text",maxLength:'10' }}/>
        <LabelWithInput text="방 인원" inputData={{id:'attendant',type:"number", min:'1', max:'5'}}/>
    </Modal>, document.getElementById('portal'))

}

export default ModalWithInput;