import { memo } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// 
import { setIdMoreInFoMoto, setGalerryShow, setImgshowgalerry } from '../../redux/actions'
import MainImgItem from '../MainImgItem'
import GalerryShow from '../GalerryShow'

const ItemMoto = ({styles, data, ...func}) => {
    const galerryInfo = useSelector(state => state.galerry)
    const dispatch = useDispatch()
    const { 
        handleMouseEnter
    } = func
    const handleGalleryShow = (listImg) => {
        dispatch(setImgshowgalerry(listImg))
        dispatch(setGalerryShow())
    }

    const handleMoreInfoMoto = (idMoto) => {
        dispatch(setIdMoreInFoMoto(idMoto))
    }

    return (
        <>
        <li className={styles.itemMoto} 
            style={{ 
                background: `#fff url(${data.imgUrl[0]}) 
                no-repeat center center
                `,
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover',
            }}>
            {/* {console.log('re-render: itemMoto')} */}
                <div className={styles.top_itemMoto_wp}>    
                    <div className={styles.info_itemMoto_wp}>
                        <h3 className={styles.name_bike}>{data.name}</h3>
                        <p className={styles.description_bike}>{data.description}</p>
                        <Link to="/reviewmoto/moreInfoMoto" onClick={() => handleMoreInfoMoto(data.id)}>
                            <button className={styles.show_more_btn}>Xem Thêm</button>
                        </Link>
                    </div>
                    <div className={styles.img_itemMoto_wp}>
                        <div className={styles.wp_img_main} onClick={() => handleGalleryShow(data.imgUrl)}>
                            <MainImgItem 
                                styles={styles}
                                data={data}
                            />
                            {/* <img src={urlMouseEnter || data.imgUrl[0]} className={styles.img_itemMoto} alt="" ></img> */}
                        </div>
                    <div className={styles.wp_more_img}>
                        <div className={styles.wp_more_img_item} 
                            onMouseEnter={() => handleMouseEnter(data.imgUrl[1], data.id)}
                            onMouseLeave={() => handleMouseEnter()}
                        >
                            <img src={data.imgUrl[1]} alt="" ></img>
                        </div>
                        <div className={styles.wp_more_img_item} 
                            onMouseEnter={() => handleMouseEnter(data.imgUrl[2], data.id)}
                            onMouseLeave={() => handleMouseEnter()}
                        >
                            <img src={data.imgUrl[2]} alt="" ></img>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.bottom_itemMoto_wp}>
                <img src={data.imgUrl[3]} alt="" ></img>
            </div>
        </li>
        {galerryInfo.galerryShow && <GalerryShow />}
        </>
    )
}

export default memo(ItemMoto)