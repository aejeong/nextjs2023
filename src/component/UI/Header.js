import styles from "../../styles/Layout.module.css";
import TextLogo from "../TextLogo";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRoomEditor } from '@/hooks/roomHooks';

/* Header UI Component */
const Header = () => {};

export const DefaultComponent = ({onClick}) => {
  const router = useRouter();

  const redirectToMain = () => {
    router.replace('/')
  }

  return(
     <div className={styles["room-box"]}>
      <button type='button' onClick={redirectToMain}>
        <TextLogo />
      </button>
     <button type='button' onClick={onClick}>
       <Image src="/images/plus.png" alt="plus" width={26} height={26} />
     </button>
   </div>
  );
 }

   export const RoomComponent = ({onClick, roomName}) => {
    const router = useRouter();
    const [dropdown,setDropdown] = useState();
    const {deleteRoomInfo} = useRoomEditor();

     return(
         <div className={styles["room-box"]}>
     <div>
       <Image
         className={styles.logo}
         src="/images/arrow-left.png"
         alt="back"
         width={12}
         height={24}
         onClick={()=> router.replace('/rooms')}
       />
       <p className={styles["room-name"]}>{roomName}</p>
     </div>
     <button type="button" onClick={()=> setDropdown(!dropdown)}>
       <Image src="/images/dots.png" alt="more" width={30} height={30} />
     </button>
      { dropdown && <DropDownComponent menuList={[{
        name: '방 삭제',
        onClick: async ()=> {
          deleteRoomInfo(router.query.roomId);
          router.replace('/rooms');
        }
      },
      {
        name: '방 나가기',
        onClick: ()=> {
          router.replace('/rooms');
        }
      }
      ]}/>}
   </div>
     );
   }

   export const DropDownComponent = ({menuList}) => {
    return(
      <ul className={styles.dropdown}>
        {
          menuList.map((list,idx) => {
            return(
              <li key={idx} onClick={list.onClick}>{list.name}</li>
            )
          })
        }
      </ul>
    )
   }

export default Header;
