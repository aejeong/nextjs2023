import commonStyles from '@/styles/Common.module.css';
import Image from 'next/image';

import Input from './UI/Input';

const InputWithSend = ({inputData}) => {
    return (
        <div className={commonStyles['send-box']}>
        <Input data={inputData}/>
        <button className={commonStyles['btn-send']} type="submit">
        <Image src='/images/send.png' alt="send-button" width={35} height={40}/>
        </button>
        </div>
    );    
}

export default InputWithSend;