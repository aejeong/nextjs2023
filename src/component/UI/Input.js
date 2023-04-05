import commonStyles from '@/styles/Common.module.css';

const Input = ({data}) => {
    return (
        <input className={commonStyles.input} {...data}/>
    );    
}

export default Input;