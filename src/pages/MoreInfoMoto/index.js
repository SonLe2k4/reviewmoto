import { useEffect, useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { useSelector } from 'react-redux'
import axios from "axios"
// 
import styles from "./style.module.scss"

const MoreInfoMoto = () => {
    const idMoreInfoMoto = useSelector(state => state.idMoreInfoMoto)
    const [APIDatas, setAPIDatas] = useState([])

    useEffect(() => {
        const APIMoreInfoMoto = `https://sonle2k4.github.io/json_reviewMoto/moreInfoMotos.json`
        axios.get(APIMoreInfoMoto)
            .then(res => {
                return res.data.filter((item) => item.id === idMoreInfoMoto)
            })
            .then((Arrdata) => {
                const [ datas ] = Arrdata
                setAPIDatas(datas);
            })
            .catch((err) => {console.log(err)})
    }, [idMoreInfoMoto])

    const handleAccordion = (e) => {
        const parentNode = e.target.parentNode
        parentNode.classList.toggle(`${styles.active}`)
    }
    return (
        <>
            {
                APIDatas &&     
                !!APIDatas.imgModal !== false &&
                <div className={styles.container}>
                    <div className={styles.wp_heading}>
                        <h1 className={styles.heading}>Thông số kỹ thuật</h1>
                        <span className={styles.heading_line}></span>
                    </div>
                    <div className={styles.wp_content}>
                        <div className={styles.left}>
                            <ul className={styles.list_imgModal}>
                                {APIDatas.imgModal !== [] && APIDatas.imgModal.map(item => (
                                    <li key={item.id}>
                                        <img className={styles.imgModal} src={item.path} alt="" ></img>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.right}>
                            <div className={styles.top_divide}>
                                <div className={styles.left}>
                                    <div className={styles.top}>{APIDatas.titleRight[0]}</div>
                                    <div className={styles.bottom}>{APIDatas.titleRight[1]}</div>
                                </div>
                                <div className={styles.right}>
                                    <div className={styles.top}>{APIDatas.titleRight[2]}</div>
                                    <div className={styles.bottom}>{APIDatas.titleRight[3]}</div>
                                </div>
                            </div>
                            <ul className={styles.accordion}>
                                <li className={styles.collapse}>
                                    <button onClick={(e) => handleAccordion(e)}>
                                        Công nghệ
                                        <div className={styles.collapse_icon}>
                                            <MdKeyboardArrowDown />
                                        </div>
                                    </button> 
                                    {
                                        APIDatas.ProductTechnology &&
                                        APIDatas.ProductTechnology !== [] &&
                                        <ul className={styles.accordion_content}>
                                        {
                                            APIDatas.ProductTechnology.map((item, index) => (
                                                <li key={item.id} className={styles.accordion_content_item} 
                                                >
                                                    <div className={styles.img}>
                                                        <img src={APIDatas.ProductTechnology[index].imgPath.logo} alt="" ></img>
                                                    </div>
                                                    <h5 className={styles.nameTechnology}>
                                                        {APIDatas.ProductTechnology[index].technology}
                                                    </h5>
                                                </li>
                                            ))
                                        }
                                    </ul>}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.wp_price}>
                        <span>Giá bán lẻ đề xuất: </span>
                        <h3 className={styles.price}>
                            {APIDatas.price}
                        </h3>
                    </div>
                    {
                        APIDatas.libralyImg &&
                        <div className={styles.library_img}>
                            <h1 className={styles.heading} style={{color: '#fff'}}>Rửa mắt thêm</h1>
                            <h4>Hình ảnh</h4>
                            <div className={styles.galerry_wp}>
                                <div className={styles.img_beside}>
                                    <img src={APIDatas.libralyImg.filter(item => item.id === 1)[0].path} alt=""></img>
                                </div>
                                <div className={styles.galerry}>
                                    {
                                        APIDatas.libralyImg.filter(item => item.id !== 1 && item.id !== 2).map(item => (
                                            <div key={item.id} className={styles.galerry_item}>
                                                <img src={item.path} alt=""></img>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className={styles.img_beside}>
                                    <img src={APIDatas.libralyImg.filter(item => item.id === 2)[0].path} alt=""></img>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default MoreInfoMoto