import { useState, useEffect } from 'react'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import styles from './styleSlider.module.scss'
import listImg from '../../img'
import clsx from 'clsx';

const Slider = () => {
    const listDataImg = listImg.slider
    const [current, setCurrent] = useState(1)
    const LengthDataImg = listDataImg.length

    // random slider (no repear slider prev)
    useEffect(() => {
        let prevsIndex = []
        
        const randomSlider = setInterval(() => {
            let index
            if(prevsIndex.length === LengthDataImg) {
                prevsIndex = []
            }
            do {
                index = Math.floor(Math.random() * LengthDataImg)
            } while (prevsIndex.includes(index))

            prevsIndex.push(index)
            setCurrent(index)
        }, 8000)

        return () => clearInterval(randomSlider)
    }, [])
    
    const nextSlider = () => {
        setCurrent(current === LengthDataImg - 1 ? 0 : current + 1)
    }
    const prevSlider = () => {
        setCurrent(current === 0 ? LengthDataImg - 1 : current - 1)
    }
    if(!Array.isArray(listDataImg) && !listDataImg.length <= 0) {
        return null
    }
    return (
        <div className={styles.slider_wp}>
            <div className={styles.greeting}>
                <h1>Hello Guys...</h1>
                <h2>Chiêm ngưỡng các siêu xe nào</h2>    
            </div>
            <FaArrowAltCircleLeft onClick={prevSlider} className={clsx(styles.control_arrow, styles.arrow_prev)}/>
            <FaArrowAltCircleRight onClick={nextSlider} className={clsx(styles.control_arrow, styles.arrow_next)}/>
            {listDataImg.map((imgItem, index) => (
                <div key={imgItem.id} className={
                    index === current 
                    ? clsx(styles.slider, styles.active) 
                    : styles.slider
                }
                >
                    {index === current && (<img src={imgItem.path} alt={imgItem.alt} className={styles.img_slider}></img>)}
                </div>
            ))}
        </div>
    )
}
export default Slider