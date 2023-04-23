import styles from '@/styles/Layout.module.css'
import LabelWithInput from '@/component/LabelWithInput';
import Logo from '../component/Logo';
import React, { useRef, useEffect, useState } from 'react'; 
import BottomAreaLayout from '@/component/layout/BottomAreaLayout';
import { useRouter } from 'next/router';
import { getSession, signIn, useSession } from "next-auth/react"

const LoggedOutComponent = ({inputRef, formHandler}) => {
  return(
    <main className={styles.main}>
    <form onSubmit={formHandler}>
      <Logo />
      <LabelWithInput text='API KEY' inputData={{id:'getApi' ,type:'password', ref: inputRef}}/>
        <BottomAreaLayout/>
    </form>
    </main>
  )
}

const LoggedInComponent = () => {
  return(
    <main className={styles.main}>
    <div>
      <Logo />
      <BottomAreaLayout/>
    </div>
    </main>
  )
}
const Home = () => {
  const inputRef = useRef(null);
  const router = useRouter();
  const {update} = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(null)

  useEffect(()=>{
    getSession().then(currentSession=>{
      if(!currentSession){
        setIsLoggedIn(false)
      }else{
        setIsLoggedIn(true)
        update({...currentSession})
      }
    })
  },[router])

  const formHandler = async (event) => {
    event.preventDefault();

    if(inputRef.current.value.trim() === ''){
      return;
    }

     const verifyResult = await signIn('api-login',{ 
      redirect: false,
      key:inputRef.current.value,
      callbackUrl: '/rooms'
    })

    if(!verifyResult.error){
      return router.replace(verifyResult.url);
    }
  }


  return isLoggedIn ? <LoggedInComponent /> : <LoggedOutComponent inputRef={inputRef} formHandler={formHandler}/>
}

export default Home;

