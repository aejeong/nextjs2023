import Image from 'next/image';
import styles from '../styles/Layout.module.css';

const Logo = () => {
    return <Image
    className={styles['image-logo']}
    src="/images/logo.png"
    alt="logo"
    width={107}
    height={104}
    />
}

export default Logo;