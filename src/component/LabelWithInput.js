import commonStyles from '@/styles/Common.module.css';
import Input from './UI/Input';

const LabelWithInput = ({inputData, text}) => {

    return (
        <div className={commonStyles['label-item']}>
        <label className={commonStyles.name} htmlFor={inputData.id}>{text}</label>
        <Input data={inputData}/>
        </div>
    );    
}

export default LabelWithInput;