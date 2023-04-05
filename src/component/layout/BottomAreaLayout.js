import styles from '../../styles/Layout.module.css';
import { useRouter } from 'next/router'; 
import { useContext } from 'react';
import dynamic from 'next/dynamic';
import {path} from '@/constant';
import { CreateRoomUIContext } from '@/context/common-context';


const BottomAreaLayout = ({onClick}) => {
  const roomUIContext = useContext(CreateRoomUIContext);
  const router = useRouter();

 const componentPath = {
  [path.HOME] : (() => {
    const HomeButtonComponent = dynamic(()=> import('../UI/Bottom').then(module=> module.homeButtonComponent))
   return <HomeButtonComponent onClick={onClick}>Login</HomeButtonComponent>
  })(),
  [path.ROOMS] : (() => {
    const ButtonComponent = dynamic(()=> import('../UI/Bottom').then(module=> module.buttonComponent))
    return <ButtonComponent onClick={roomUIContext.onClick}>방 생성</ButtonComponent>
  })(),
    [path.ROOM_DETAIL] : (() => {
      const SendComponent = dynamic(()=> import('../UI/Bottom').then(module => module.sendComponent))
      return <SendComponent onClick={onClick} placeholder='입력해주세요.' />
    })()
  }

  return(
     <div className={styles['bottom-area']}>
        {componentPath[router.pathname]}
     </div>
    );
}

export default BottomAreaLayout;