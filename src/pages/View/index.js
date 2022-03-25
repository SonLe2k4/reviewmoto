import { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
// import Select from 'react-select';

import { setSearchInputInPageView } from '../../redux/actions'
import styles from './style.module.scss';
import GalerryShow from '../../Component/GalerryShow'
import { setGalerryShow, setImgshowgalerry, setLocallistmotouserinput } from '../../redux/actions'

const View = () => {
    const [idMotoUserAdd, setIdMotoUserAdd] = useState(1)
    const [dataLocalListMotoUserInput, setDataLocalListMotoUserInput] = useState([])
    const [ isOpenOption, setIsOpenOption ] = useState(false)
    const valueInputCCMotoRef = useRef()
    const valueInputNameMotoRef = useRef()
    const valueInputPriceMotoRef = useRef()
    const valueInputUrlImgMotoRef = useRef()
    // ------------------------
    const dispatch = useDispatch()
    // const valueSearchRedux = useSelector(state => state.viewPageSort.searchInput)
    const galerryInfo = useSelector(state => state.galerry)
    const LocalListMotoUserInput = useSelector(state => state.localListMotoUserInput)
    // API -----------------------------------
    const [datasAPI, setDataAPI] = useState([])
    const API = "https://sonle2k4.github.io/json_reviewMoto/dbViewPage.json"
    // ----------------------------------------------------
    const [valueSearch, setValueSearch] = useState('')
    // 
    const [nameMotoInput, setNameMotoInput] = useState('')    
    const [ccMotoInput, setCcMotoInput] = useState('')    
    const [priceMotoInput, setPriceMotoInput] = useState('')    
    const [urlImgMotoInput, setUrlImgMotoInput] = useState('')    
    
    // ---------------------------------------------------
    useEffect(() => {
        axios.get(API)
            .then(res => res.data)
            // handle searchTextInput
            .then(datas => datas.filter(data => data.name.includes(valueSearch) ))
            .then(data => setDataAPI(data))

    }, [valueSearch]);

    useEffect(() => {
        const datas = JSON.parse(localStorage.getItem('ListMotoUserInput'))
        setDataLocalListMotoUserInput(datas)
    }, [LocalListMotoUserInput])

    // -------------------------------------------------------
    const handleChangeTextInput = (data) => {
        setValueSearch(data)
        dispatch(setSearchInputInPageView(data))
    }

    const handleShowGalerry = (listImg) => {
        dispatch(setImgshowgalerry(listImg))
        dispatch(setGalerryShow())
    }

    const handleSortPrice = () => {
        console.log(document.getElementById(`${styles.select_list_moto}`));
    }

    const handleSubmit = (e) => {
        let isInvalid;
        
        const ccElement = valueInputCCMotoRef.current
        const NameElement = valueInputNameMotoRef.current
        const PriceElement = valueInputPriceMotoRef.current
        const UrlImgElement = valueInputUrlImgMotoRef.current
        
        e.preventDefault();
        
        // function handleNameInput
        const handleNameInput = (isInvalid) => {
            if(NameElement.value === '') {
                const messageElement = NameElement.parentNode.querySelector('span')
                messageElement.innerHTML = 'Vui lòng nhập tên xe.'
                isInvalid = false
            }
            else if (NameElement.value !== '') {
                const messageElement = NameElement.parentNode.querySelector('span')
                messageElement.innerHTML = ''
                isInvalid = true
            }
            return isInvalid
        }

        // function handlePriceInput
        const handlePriceInput = (isInvalid) => {
            if(PriceElement.value === '') {
                const messageElement = PriceElement.parentNode.querySelector('span')
                messageElement.innerHTML = 'Vui lòng nhập giá xe.'
                return isInvalid = false
            } 
            if (isNaN(Number(PriceElement.value))) {
                const messageElement = PriceElement.parentNode.querySelector('span')
                messageElement.innerHTML = 'Giá xe phải là số, vui lòng nhập lại.'
                return isInvalid = false
            } if(PriceElement.value !== '') {
                const messageElement = PriceElement.parentNode.querySelector('span')
                messageElement.innerHTML = ''
                return isInvalid = true
            }
            return isInvalid
        }

        // function handleCciceInput
        const handleCciceInput = (isInvalid) => {
            if(ccElement.value === '') {
                const messageElement = ccElement.parentNode.querySelector('span')
                messageElement.innerHTML = 'Vui lòng nhập phân khối xe.'
                return isInvalid = false
            } if(isNaN(Number(ccElement.value)) ) {
                const messageElement = ccElement.parentNode.querySelector('span')
                messageElement.innerHTML = 'Phân khôi phải là số, hãy nhập lại.'
                return isInvalid = false
            } if(Number(ccElement.value) > 1000) {
                const messageElement = ccElement.parentNode.querySelector('span')
                messageElement.innerHTML = 'Bạn đùa sao, hiện nay chưa có moto nào hơn 1000cc cả, nhập lại.'
                return isInvalid = false
            } else {
                const messageElement = ccElement.parentNode.querySelector('span')
                messageElement.innerHTML = ''
                return isInvalid = true
            }
        }

        // function handlerUrlImgInput
        const handlerUrlImgInput = (isInvalid) => {
            if(UrlImgElement.value === '') {
                const messageElement = UrlImgElement.parentNode.querySelector('span')
                messageElement.innerHTML = 'Vui lòng thêm ít nhất một Url hình ảnh.'
                return isInvalid = false
            } 
            if(UrlImgElement.value !== '') {
                const messageElement = UrlImgElement.parentNode.querySelector('span')
                messageElement.innerHTML = ''
                return isInvalid = true
            }
            return isInvalid
        }

        // function handleIsUrl
        function validURL(isInvalid) {
            var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
            
            if(UrlImgElement.value.includes(',')) {
                const arrNew = Array.from(UrlImgElement.value.split(','))
                
                const isUrl = arrNew.every(url => pattern.test(url))
                if(isUrl) {
                    const messageElement = UrlImgElement.parentNode.querySelector('span')
                    messageElement.innerHTML = ''
                    return isInvalid = true
                }
                else if(isUrl === false) {
                    const messageElement = UrlImgElement.parentNode.querySelector('span')
                    messageElement.innerHTML = 'Mốt trong những Url bạn nhập lỗi.'
                    return isInvalid = false
                }
            } else if(UrlImgElement.value.includes(',') === false) {
                const isUrl = pattern.test(UrlImgElement.value)
                if(isUrl) {
                    const messageElement = UrlImgElement.parentNode.querySelector('span')
                    messageElement.innerHTML = ''
                    return isInvalid = true
                } else if(isUrl === false) {
                    const messageElement = UrlImgElement.parentNode.querySelector('span')
                    messageElement.innerHTML = 'Url bạn nhập lỗi'
                    return isInvalid = true
                }
            }
            return isInvalid
        }

        const handleNotdata = (isInvalid) => {
            // name
            handleNameInput(isInvalid)
            // cc
            handleCciceInput(isInvalid)
            // price
            handlePriceInput(isInvalid)
            // urlImg
            handlerUrlImgInput(isInvalid)
            // isUrl 
            validURL(isInvalid)
            // handleAll
            if(handleNameInput(isInvalid) && handleCciceInput(isInvalid) && handlePriceInput(isInvalid) && handlerUrlImgInput(isInvalid) && validURL(isInvalid)) {
                return isInvalid = true;
            } else {
                return isInvalid = false;
            }
        }
        const result = handleNotdata()
        // true => post data
        if(result) {

            const name = NameElement.value 
            const price = PriceElement.value 
            const cc = ccElement.value
            let imgUrl

            // handle urlInputImg 
            if(UrlImgElement.value.includes(',')) {
                const arrNew = Array.from(UrlImgElement.value.split(','))
                imgUrl = arrNew
            } else if(UrlImgElement.value.includes(',') === false) {
                let arr = []
                arr.push(UrlImgElement.value)
                imgUrl = arr
            }
            setIdMotoUserAdd(prev => prev + 1)
            const dataPushLocal = {
                id: idMotoUserAdd,
                name,
                price: price + "Đ",
                cc: cc + "cc",
                imgUrl
            }
            dispatch(setLocallistmotouserinput(dataPushLocal))

            localStorage.setItem('ListMotoUserInput', JSON.stringify(LocalListMotoUserInput))
            // alert(`
            //     Tên xe: ${name}
            //     Giá xe: ${price}
            //     Phân khối xe: ${cc}
            //     Url ảnh xe: ${imgUrl}

            //     Chức năng thêm xe đang phát triển...
            // `)
        }
    }

    return (
        <div className={styles.container}>
            <div className={clsx(styles.options_bar, {
                [styles.open]: isOpenOption
            })}>
                <div className={styles.btnShowOptions} onClick={() => setIsOpenOption(prev => !prev)}></div>
                <input
                    value={valueSearch}
                    onChange={e => handleChangeTextInput(e.target.value)}
                    type="text"
                    placeholder="Nhập tên xe bạn muốn tìm ..."
                ></input>
                <div className={styles.selector_obtion}>
                    <label htmlFor="">Tùy chọn</label>
                    <select className={styles.select_list_moto} onChange={handleSortPrice}>
                        <optgroup label="Giá xe">
                            <option onChange={handleSortPrice} value="default">Mặc định</option>
                            <option onChange={handleSortPrice} value="decrease">Giảm</option>
                            <option onChange={handleSortPrice} value="increase">Tăng</option>
                        </optgroup>
                    </select>
                </div>
                {/* add moto */}
                <form className={styles.section_post_data}>
                    <span className={styles.message_heading}>Bạn muốn thêm moto ?, nhập thông tin vào dưới đây</span>

                    <div className={styles.formGroup}>
                        <input ref={valueInputNameMotoRef} onChange={e => setNameMotoInput(e.target.value)} value={nameMotoInput} type="text" placeholder="Nhập tên xe..."/>
                        <span className={styles.form_message}></span>            
                    </div>

                    <div className={styles.formGroup}>
                        <input ref={valueInputPriceMotoRef} onChange={e => setPriceMotoInput(e.target.value)} value={priceMotoInput} type="text" placeholder="Nhập giá xe... (Đ)"/>
                        <span className={styles.form_message}></span>            
                    </div>

                    <div className={styles.formGroup}>
                        <input ref={valueInputCCMotoRef} onChange={e => setCcMotoInput(e.target.value)} value={ccMotoInput} type="text" placeholder="Nhập phân khôi xe... "/>
                        <span className={styles.form_message}></span>            
                    </div>

                    <div className={styles.formGroup}>
                        <input ref={valueInputUrlImgMotoRef} onChange={e => setUrlImgMotoInput(e.target.value)} value={urlImgMotoInput} type="text" placeholder="Nhập Url ảnh xe. Mỗi Url cách nhau bằng giấu phẩy..."/>
                        <span className={styles.form_message}></span>            
                    </div>

                    <button onClick={e => handleSubmit(e)} type="submit" className={styles.submitBtn}>Thêm</button>
                </form>
            </div>
            <div onClick={() => setIsOpenOption(prev => !prev)} className={clsx(styles.modalObtion, {
                [styles.open]: isOpenOption
            })}></div>
            {/* =============================== */}
            <ul className={styles.list_item}>
                {
                    datasAPI && Array.isArray(datasAPI) && datasAPI !== [] &&
                    datasAPI.map((data) => (
                        <li className={styles.item} key={data.id}>
                            <div className={styles.item_top} onClick={() => handleShowGalerry(data.imgUrl)}>
                                <a className={styles.link_item_top} href="#">
                                    <img className={styles.item_img} src={
                                        data.imgUrl && Array.isArray(data.imgUrl) &&
                                        data.imgUrl !== [] && data.imgUrl[0]
                                    } alt="" >
                                    </img>
                                </a>
                            </div>
                            <div className={styles.item_info}>
                                <div className={styles.item_info_left}>
                                    <a href="#" className={styles.item_name}>Tên: {data.name}</a>
                                    <h4 className={styles.item_price}>Giá: {data.price}</h4>
                                    <a href="#" className={styles.item_cc}>Phân khối: {data.cc}</a>
                                </div>
                                <div className={styles.item_info_right}>
                                    <button className={styles.moreInfoMoto}>Xem thêm</button>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
            <div className={styles.bulkhead}>Dưới đây là danh sách moto được thêm vào</div>
            <ul className={styles.list_item}>
                {
                    dataLocalListMotoUserInput !== null &&
                    dataLocalListMotoUserInput.map((data) => (
                        <li className={styles.item} key={data.id}>
                            <div className={styles.item_top} onClick={() => handleShowGalerry(data.imgUrl)}>
                                <a className={styles.link_item_top} href="#">
                                    <img className={styles.item_img} src={
                                        data.imgUrl && Array.isArray(data.imgUrl) &&
                                        data.imgUrl !== [] && data.imgUrl[0]
                                    } alt="" >
                                    </img>
                                </a>
                            </div>
                            <div className={styles.item_info}>
                                <div className={styles.item_info_left}>
                                    <a href="#" className={styles.item_name}>Tên: {data.name}</a>
                                    <h4 className={styles.item_price}>Giá: {data.price}</h4>
                                    <a href="#" className={styles.item_cc}>Phân khối: {data.cc}</a>
                                </div>
                                <div className={styles.item_info_right}>
                                    <button className={styles.moreInfoMoto}>Xem thêm</button>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
            { galerryInfo.galerryShow && <GalerryShow />}
        </div>
    )
}

export default View