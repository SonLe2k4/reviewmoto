import { useState, useEffect } from 'react'
import { ImRocket } from 'react-icons/im'
// 
import styles from './styleBacktop.module.scss'
const Backtop = () => {
    const [isBacktop, setBacktop] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = Math.floor(window.scrollY)
            if(scrollHeight >= 200) {
                setBacktop(true)
            } else {
                setBacktop(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    
    const handleBacktop = () => {
        document.documentElement.scrollTop = 0
    }
    
    return isBacktop && 
        <div className={styles.wp_backtop} onClick={handleBacktop}>
            <ImRocket />
        </div> || <></>
    
}

export default Backtop