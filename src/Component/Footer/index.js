import { useCallback } from 'react'
import { BsYoutube, BsTwitter, BsInstagram, BsFacebook } from 'react-icons/bs'
import { FaSearch } from 'react-icons/fa'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
// 
import { setSearch } from '../../redux/actions'
import Search from '../Search'
import styles from './styleFooter.module.scss';
import listImg from '../../img';

const Footer = () => {
    const isSearch = useSelector(state => state.isSearch)
    const dispatch = useDispatch()

    const handleDisplaySearch = useCallback(() => {
        dispatch(setSearch())
    }, [])

    return (
        <>
        <div className={styles.footer}>
            <div className={styles.logo_footer}>
                <a href="#" className={styles.link_logo_footer}>
                    <img src={listImg.logo[0]} alt="#"></img>
                </a>
            </div>
            <h3 className={clsx(styles.text)}>
                REVIEWMOTO
            </h3>
            <ul className={styles.list_social_network}>
                <li className={styles.item_social_network}>
                    <a href="#" className={styles.link_youtube}>
                        <BsYoutube />
                    </a>
                </li>
                <li className={styles.item_social_network}>
                    <a href="#" className={styles.link_twitter}>
                        <BsTwitter />
                    </a>
                </li>
                <li className={styles.item_social_network}>
                    <a href="#" className={styles.link_instagram}>
                        <BsInstagram />
                    </a>
                </li>
                <li className={styles.item_social_network}>
                    <a href="#" className={styles.link_facebook}>
                        <BsFacebook />
                    </a>
                </li>
                <li className={styles.item_social_network} onClick={handleDisplaySearch}>
                    <div className={styles.search}>
                        <FaSearch />
                    </div>
                </li>
            </ul>
            <ul className={styles.special_menu}>
                <li className={styles.item_special_menu}>
                    <a href="#">Về chúng tôi</a>
                </li>
                <li className={styles.item_special_menu}>
                    <a href="#">Liên hệ chúng tôi</a>
                </li>
                <li className={styles.item_special_menu}>
                    <a href="#">Thông báo bản quyền</a>
                </li>
                <li className={styles.item_special_menu}>
                    <a href="#">Chính sách bảo mật</a>
                </li>
            </ul>
            <div className={styles.copyright}>
                <span>© 2022 Lê Thanh Sơn</span>
            </div>
            <div className={styles.bottom_footer}>
                Kiên Quyết, Bức Phá, Vươn Lên
            </div>
        </div>
        {isSearch && <Search />}
        </>
    )
}

export default Footer