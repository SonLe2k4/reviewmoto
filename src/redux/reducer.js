import { 
    SET_SEARCH, 
    SET_IDMOREINFOMOTO,
    SET_OPENNAVMOBILE,
    SET_GALERRYSHOW,
    SET_SEARCHINPUTINPAGEVIEW,
    SET_IMGSHOWGALERRY,
    SET_LOCALLISTMOTOUSERINPUT
} from './constants';

const initialState = {
    isSearch: false,
    isOpenNavMobile: false,
    idMoreInfoMoto: 1,
    viewPageSort: {
        searchInput: '',
        selectOptions: null,
    },
    localListMotoUserInput: [],
    galerry: {
        galerryShow: false,
        listImgShowGalerry: [],
        currentImgGalerry: 0,
    }
}

const reducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case SET_SEARCH:
            return {
                ...state,
                isSearch: !state.isSearch 
            }
        case SET_IDMOREINFOMOTO:
            return {
                ...state,
                idMoreInfoMoto: payload
            }
        case SET_OPENNAVMOBILE: 
            return {
                ...state,
                isOpenNavMobile: !state.isOpenNavMobile
            }
        case SET_SEARCHINPUTINPAGEVIEW:
            return {
                ...state,
                viewPageSort: {
                    ...state.viewPageSort,
                    searchInput: payload
                }
            }
        case SET_IMGSHOWGALERRY:
            return {
                ...state,
                galerry: {
                    ...state.galerry,
                    listImgShowGalerry: action.payload
                }
            }
        case SET_GALERRYSHOW: 
            return {
                ...state,
                galerry: {
                    ...state.galerry,
                    galerryShow: !state.galerry.galerryShow
                }
            }
        case SET_LOCALLISTMOTOUSERINPUT:
            return {
                ...state,
                localListMotoUserInput: [...state.localListMotoUserInput, payload]
            }
        default:
            return state
    }
}

export { initialState }
export default reducer