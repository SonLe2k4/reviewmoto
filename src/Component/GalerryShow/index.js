import clsx from 'clsx'
import { useState } from 'react';
import { AiOutlineCaretLeft, AiOutlineCaretRight } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux'

import { setGalerryShow, } from '../../redux/actions'
import styles from './style.module.scss'

const GalerryShow = () => {
    const galerryInfo = useSelector(state => state.galerry)
    const dispatch = useDispatch()
    const [currentImgGalerry, setCurrentImgGalerry] = useState(0)

    const handleChangeGalerry = (e, i) => {
        switch(i) {
            case 1:
                setCurrentImgGalerry(prev => {
                    if(prev === galerryInfo.listImgShowGalerry.length - 1) {
                        return 0
                    } else {
                        return prev + 1
                    }
                })
                break;
            case -1:
                setCurrentImgGalerry(prev => {
                    if(prev === 0) {
                        return galerryInfo.listImgShowGalerry.length - 1
                    } else {
                        return prev - 1
                    }
                })
                break;
            default:
        }
        e.stopPropagation();
    }
    return (
        <>
            <div className={styles.galerry} onClick={() => dispatch(setGalerryShow())}>
                <div className={clsx(styles.btn, styles.prev)} onClick={(e) => handleChangeGalerry(e, -1)}>
                    <AiOutlineCaretLeft/>
                </div>
                {/* {console.log('re-render: galerry')} */}
                <div className={clsx(styles.btn, styles.next)} onClick={(e) => handleChangeGalerry(e, 1)}>
                    <AiOutlineCaretRight/>
                </div>
                <div className={styles.galerry_container}>
                    <img 
                        src={galerryInfo.listImgShowGalerry[currentImgGalerry]} 
                        alt=""
                        className={styles.galerry_img}
                        onClick={(e) => e.stopPropagation()}
                    >
                    </img>
                </div>
            </div>
        </>
    )
}
export default GalerryShow