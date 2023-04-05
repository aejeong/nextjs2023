import styles from "../../styles/Layout.module.css";
import TextLogo from "../TextLogo";
import Image from "next/image";

/* Header UI Component */
const Header = () => {};

export const defaultComponent = ({onClick}) => {
  return(
     <div className={styles["room-box"]}>
     <TextLogo />
     <button type="button" onClick={onClick}>
       <Image src="/images/plus.png" alt="plus" width={26} height={26} />
     </button>
   </div>
  );
 }

   export const roomComponent = ({onClick, roomName}) => {
     return(
         <div className={styles["room-box"]}>
     <div>
       <Image
         className={styles.logo}
         src="/images/arrow-left.png"
         alt="back"
         width={12}
         height={24}
       />
       <p className={styles["room-name"]}>{roomName}</p>
     </div>
     <button type="button" onClick={onClick}>
       <Image src="/images/dots.png" alt="more" width={30} height={30} />
     </button>
   </div>
     );
   }

export default Header;
