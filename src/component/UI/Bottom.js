import commonStyles from '../../styles/Common.module.css';
import Button from './Button';
import InputWithSend from '../InputWithSend';

/* Bottom UI Component */
const Bottom = () => {};

export const homeButtonComponent = ({onClick, children}) => {
  return(
   <>
   {buttonComponent({onClick,children})}
   <a className={commonStyles.link} href="https://platform.openai.com/account/api-keys">KEY 발급 받는 법</a>
   </>
  );
 }

export const buttonComponent = ({onClick, children}) => {
   return(
    <Button type='button' onClick={onClick}>{children}</Button>
   );
  }


export const sendComponent = ({onClick, placeholder}) => {
     return <InputWithSend id="send" type="text" placeholder={placeholder} onClick={onClick}/>
   }

export default Bottom;
