import styles from '@/styles/Layout.module.css'
import LabelWithInput from '@/component/LabelWithInput';
import Logo from '../component/Logo';
import React, { useRef } from 'react'; 
import BottomAreaLayout from '@/component/layout/BottomAreaLayout';
import { useRouter } from 'next/router';
import { signIn, getSession, useSession } from "next-auth/react"

const Home = () => {
  const inputRef = useRef(null);
  const router = useRouter();
  const {data: session, status} = useSession();
  

  const formHandler = async (event) => {
    event.preventDefault();

    if(inputRef.current.value.trim() === ''){
      console.log('보유하신 API 키를 입력해주세요')
      return;
    }

     const verifyResult = await signIn('api-login',{ 
      redirect: false,
      key:inputRef.current.value,
      callbackUrl: '/rooms'
    })

    console.log(verifyResult,'verifyResult')

    if(!verifyResult.error){
      return router.push(verifyResult.url);
    }
  }

  const MainComponent = () => {
    if(status === 'authenticated' && session){
      return(
        <div>
          <Logo />
          <BottomAreaLayout/>
        </div>
      )
    }
      return(
        <form onSubmit={formHandler}>
          <Logo />
          <LabelWithInput text='API KEY' inputData={{id:'getApi' ,type:'password', ref: inputRef}}/>
            <BottomAreaLayout/>
        </form>
      )
  }

  return (
        <main className={styles.main}>
          <MainComponent />
        </main>
  )
}

export default Home;

