import { Link, Outlet } from 'react-router-dom'
import clsx from 'clsx'
import { useState, useEffect, useCallback, useRef } from 'react' 
import { FaInstagramSquare, FaStreetView, FaUserCircle, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { AiFillHome, AiFillContacts } from 'react-icons/ai'
import { IoLogoYoutube } from 'react-icons/io'
import { BsFacebook } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
// 
import listImg from '../../img'
import { setSearch, setOpenNavMobile } from '../../redux/actions'
import styles from './styleHeading.module.scss'

// conponent
import Search from '../Search'

const Heading = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const closeIconNavMobileRef = useRef()
    const { isSearch, isOpenNavMobile } = state
    // console.log('re-render: Heading');
    const logoWeb = listImg.logo
    // console.log('isOpenNavMobile :', isOpenNavMobile);
    // console.log('isSearch :', isSearch);
    const [isScroll, setIsScroll] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = Math.floor(window.scrollY)
            scrollY > 0 ? setIsScroll(true) : setIsScroll(false)
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleDisplaySearch = useCallback(() => {
        dispatch(setSearch())
    }, [])

    const handleDisplayNavMobile = useCallback(() => {
        dispatch(setOpenNavMobile())

    }, [])

    const handleClickSearch = () => {
        handleDisplaySearch()
    }
    return (
        <>
            <nav className={clsx(styles.heading_nav, 
                {
                    [styles.scrolled]: isScroll
                }, {
                    [styles.open]: isOpenNavMobile
                })
            }>
                <a className={styles.logo_link} href="#">
                    <img className={styles.logo} src={logoWeb} alt=""></img>
                </a>
                <div className={styles.closeNavMobile} onClick={handleDisplayNavMobile} ref={closeIconNavMobileRef}>
                    <FaTimes />
                </div>
                <ul className={styles.heading_ul}>
                    <li className={styles.nav_item} onClick={handleDisplayNavMobile}>
                        <Link className={styles.nav_item_link} to="/reviewmoto/">
                        <AiFillHome className={styles.nav_icon}/>
                            Trang chủ
                        </Link>
                    </li>
                    <li className={styles.nav_item} onClick={handleDisplayNavMobile}>
                        <Link className={styles.nav_item_link} to="/reviewmoto/view">
                        <FaStreetView className={styles.nav_icon}/>
                            Tham quan
                        </Link>
                    </li>
                    <li className={clsx(styles.nav_item, styles.has_child)}>
                        <Link className={styles.nav_item_link} to="/reviewmoto/contact">
                        <AiFillContacts className={styles.nav_icon}/>
                            Liên hệ
                        </Link>
                        <ul className={clsx(styles.submenu, styles.contact_menu)}>
                            <li className={styles.item_contact} onClick={handleDisplayNavMobile}>
                                <a href="#" className={styles.item_link_contact}>
                                    <BsFacebook className={styles.icon_social} />
                                    facebook
                                </a>
                            </li>
                            <li className={styles.item_contact} onClick={handleDisplayNavMobile}>
                                <a href="#" className={styles.item_link_contact}>
                                    <IoLogoYoutube className={styles.icon_social} />
                                    Youtube
                                </a>
                            </li>
                            <li className={styles.item_contact} onClick={handleDisplayNavMobile}>
                                <a href="#" className={styles.item_link_contact}>
                                    <FaInstagramSquare className={styles.icon_social} />
                                    Instargram
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className={clsx(styles.nav_item)} onClick={handleDisplayNavMobile}>
                        <Link className={styles.nav_item_link} to="/reviewmoto/sign_up">
                            <FaUserCircle className={styles.nav_icon}/>
                            Đăng nhập
                        </Link>
                    </li>
                    <li className={clsx( styles.search)} onClick={handleClickSearch}>
                        <FaSearch className={styles.iconSearch}/>
                    </li>
                </ul>
                { isSearch && <Search />}
            </nav>
            <nav className={styles.navMobile}>
                <div className={styles.iconNavMobile} onClick={handleDisplayNavMobile}>
                    <FaBars />
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default Heading