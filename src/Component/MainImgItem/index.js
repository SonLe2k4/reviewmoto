import { useContext } from 'react'
import { UrlMouseEnterContext } from '../../pages/Home'

const MainImgItem = ({ data, styles }) => {
    const urlMouseEnter = useContext(UrlMouseEnterContext)
    return (
        <>
        {
            urlMouseEnter && urlMouseEnter.dataId && urlMouseEnter.path &&
            data.id === urlMouseEnter.dataId 
            && <img src={urlMouseEnter.path} className={styles.img_itemMoto} alt="" ></img>
            || <img src={data.imgUrl[0]} className={styles.img_itemMoto} alt="" ></img>
        }
        </>
    )
}

export default MainImgItem