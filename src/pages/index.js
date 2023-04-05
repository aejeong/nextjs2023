import styles from '@/styles/Layout.module.css'
import LabelWithInput from '@/component/LabelWithInput';
import Logo from '../component/Logo';

export default function Home() {
  return (
      <main className={styles.main}>
        <div>
        <Logo />
        <LabelWithInput text='API KEY' inputData={{id:'getApi' ,type:'text'}}/>
        </div>
      </main>
  )
}
