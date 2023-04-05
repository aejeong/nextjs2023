import commonStyles from '@/styles/Common.module.css';
import Image from 'next/image';

import Input from './UI/Input';

const InputWithSend = ({type,id, placeholder}) => {
    return (
        <div className={commonStyles['send-box']}>
        <Input id={id} type={type} placeholder={placeholder}/>
        <button className={commonStyles['btn-send']} type="submit">
        <Image src='/images/send.png' alt="send-button" width={35} height={40}/>
        </button>
        </div>
    );    
}

export default InputWithSend;