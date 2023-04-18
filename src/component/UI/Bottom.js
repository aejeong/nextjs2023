import commonStyles from '../../styles/Common.module.css';
import Button from './Button';
import InputWithSend from '../InputWithSend';

/* Bottom UI Component */
const Bottom = () => {};

export const HomeButtonComponent = ({...args}) => {
  return(
   <>
   {ButtonComponent({...args})}
   <a className={commonStyles.link} href="https://platform.openai.com/account/api-keys">KEY 발급 받는 법</a>
   </>
  );
 }

export const ButtonComponent = ({type = 'button',onClick, children}) => {
   return(
    <Button type={type} onClick={onClick}>{children}</Button>
   );
  }


export const SendComponent = ({inputData}) => {
     return <InputWithSend inputData={inputData}/>
   }

export default Bottom;
