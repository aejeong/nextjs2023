import commonStyles from '@/styles/Common.module.css';

const Button = ({type,children,className, onClick}) => {
    const classNames = `${commonStyles.button} ${className ? className : ''}`
    return (
        <button className={classNames} type={type} onClick={onClick}>{children}</button>
    );    
}

export default Button;