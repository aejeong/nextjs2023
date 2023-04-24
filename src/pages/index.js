import styles from '@/styles/Layout.module.css'
import LabelWithInput from '@/component/LabelWithInput';
import Logo from '../component/Logo';
import React, { useRef, useEffect, useState } from 'react'; 
import BottomAreaLayout from '@/component/layout/BottomAreaLayout';
import Router from 'next/router';
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
  const {update} = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(()=>{
    getSession().then(currentSession=>{
      if(!currentSession){
        setIsLoggedIn(false)
      }else{
        setIsLoggedIn(true)
        update({...currentSession})
      }
    })
  },[update])

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
      return Router.replace(verifyResult.url);
    }else{
      return alert('키 입력을 확인해주세요.')
    }
  }


  return isLoggedIn ? <LoggedInComponent /> : <LoggedOutComponent inputRef={inputRef} formHandler={formHandler}/>
}

export default Home;

