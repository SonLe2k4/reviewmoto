import { useEffect, useRef, memo, useCallback } from 'react'
import { FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearch, setIdMoreInFoMoto, setOpenNavMobile } from '../../redux/actions'
// 
import styles from './styleSearch.module.scss'

const Search = () => {
    const dispatch = useDispatch()
    
    const inputRef = useRef()
    useEffect(() => {
        inputRef.current.focus()
    }, [])
    const handleDisplaySearch = useCallback(() => {
        dispatch(setSearch())
    }, [])

    const handleMoreInfoMoto = (idMoto) => {
        dispatch(setIdMoreInFoMoto(idMoto))
        dispatch(setOpenNavMobile())
        dispatch(setSearch())
    }

    return (
        <div className={styles.modalSearch}>
            <div className={styles.modalSearch_body}>
                <div className={styles.wp_btn_close} onClick={handleDisplaySearch}>
                    <FaTimes className={styles.icon_close}/>
                </div>
                <label htmlFor="searchInput" className={styles.searchLabel}>Bạn muốn tìm gì nào ?</label>
                <input ref={inputRef} id="searchInput" className={styles.searchInput} placeholder="Search"></input>
                <div className={styles.wp_bottom}>
                    <div className={styles.suggestions_wrap}>
                        <ul className={styles.list_suggestions}>
                            <li className={styles.item_suggestions}>
                                <Link to="/moreInfoMoto" onClick={() => handleMoreInfoMoto(1)}>
                                    #Kawasaki Ninja H2
                                </Link>
                            </li>
                            <li className={styles.item_suggestions}>
                                <a href="#">
                                </a>
                            </li>
                            <li className={styles.item_suggestions}>
                                <a href="#">
                                </a>
                            </li>
                            <li className={styles.item_suggestions}>
                                <a href="#">
                                </a>
                            </li>
                            <li className={styles.item_suggestions}>
                                <a href="#">
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* <span className={styles.dict_sentence}>Nhập để tìm kiếm hoặc nhấn ESC để đóng</span> */}
                </div>
            </div>
        </div>
    )
}

export default memo(Search)