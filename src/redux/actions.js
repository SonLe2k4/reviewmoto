import * as constants from './constants';

const setSearch = () => {
    return {
        type: constants.SET_SEARCH,
    }
}

const setOpenNavMobile = () => {
    return {
        type: constants.SET_OPENNAVMOBILE,
    }
}

const setIdMoreInFoMoto = (payload) => {
    return {
        type: constants.SET_IDMOREINFOMOTO,
        payload
    }
}

const setSearchInputInPageView = (payload) => {
    return {
        type: constants.SET_SEARCHINPUTINPAGEVIEW,
        payload
    }
}

const setGalerryShow = () => {
    return {
        type: constants.SET_GALERRYSHOW
    }
}

const setImgshowgalerry = (payload) => {
    return {
        type: constants.SET_IMGSHOWGALERRY,
        payload
    }
}

const setLocallistmotouserinput = (payload) => {
    return {
        type: constants.SET_LOCALLISTMOTOUSERINPUT,
        payload
    }
}
export {
    setSearch,
    setIdMoreInFoMoto,
    setOpenNavMobile,
    setSearchInputInPageView,
    setGalerryShow,
    setImgshowgalerry,
    setLocallistmotouserinput
}