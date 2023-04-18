import styles from "../../styles/Layout.module.css";
import { useRouter } from "next/router";
import { useContext } from "react";
import dynamic from "next/dynamic";
import { path } from "@/constant";
import { CreateRoomUIContext } from "@/context/common-context";
import { useSession } from "next-auth/react";

const BottomAreaLayout = (props) => {
  const roomUIContext = useContext(CreateRoomUIContext);
  const router = useRouter();
  const { data: session } = useSession();

  const componentPath = {
    [path.HOME]: (() => {
      const HomeButtonComponent = dynamic(() =>
        import("../UI/Bottom").then((module) => module.HomeButtonComponent)
      );
      if (session) {
        return (
          <HomeButtonComponent
            onClick={() => {
              router.replace("/rooms");
            }}
            type="button"
          >
            입장하기
          </HomeButtonComponent>
        );
      }
      return (
        <HomeButtonComponent onClick={props.onClick} type="submit">
          Login
        </HomeButtonComponent>
      );
    })(),
    [path.ROOMS]: (() => {
      const ButtonComponent = dynamic(() =>
        import("../UI/Bottom").then((module) => module.ButtonComponent)
      );
      return (
        <ButtonComponent onClick={!roomUIContext.isActive ? roomUIContext.onClick : props.onClick} type={roomUIContext.isActive ? 'submit': 'button'}>
          방 생성
        </ButtonComponent>
      );
    })(),
    [path.ROOM_DETAIL]: (() => {
      const SendComponent = dynamic(() =>
        import("../UI/Bottom").then((module) => module.SendComponent)
      );
      return <SendComponent inputData={props.inputData} />;
    })(),
  };

  return (
    <div className={styles["bottom-area"]}>
      {componentPath[router.pathname]}
    </div>
  );
};

export default BottomAreaLayout;
