import axios from 'axios'
import { useEffect, useState, useCallback, createContext } from 'react'
import clsx from 'clsx'

import ItemMoto from '../../Component/ItemMoto';
import styles from './styles.module.scss';
import { Slider } from '../../Component';
import { } from '../../redux/actions'

// Context
const UrlMouseEnterContext = createContext()

const Home = () => {
    
    const [urlMouseEnter, setUrlMouseEnter] = useState({})
    const [datas, setDatas] = useState([])

    useEffect(() => {
        document.body.scrollTop = 0
    }, [])
    
    useEffect(() => {
        const DataTop5Fast = "https://sonle2k4.github.io/json_reviewMoto/dbTop5MotosFash.json"
        axios.get(DataTop5Fast)
            .then(res => {
                setDatas(res.data)
            })
            .catch(err => {
                console.log('have error', err);
            })
    }, [])

    const handleMouseEnter = useCallback((url, dataId) => {
        setUrlMouseEnter({path: url, dataId})
    }, [])

    return (
        <UrlMouseEnterContext.Provider value={urlMouseEnter}>
        <Slider />
        <div className={styles.wp_home}>
            <h1 className={styles.heading}>Top {datas.length} xe Moto thương mại nhanh nhất</h1>
            <ul className={styles.listMotos}>
                {datas.map(data => (
                    <ItemMoto
                        key={data.id} 
                        styles={styles}
                        data={data}
     
                        // func
                        handleMouseEnter={handleMouseEnter}
                    />
                ))}
            </ul>
        </div>
        </UrlMouseEnterContext.Provider>
    )
}

// Context
export {UrlMouseEnterContext}

export default Home
