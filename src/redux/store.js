import { createStore } from "redux";
import reducer, { initialState } from "./reducer"

let store = createStore(reducer, initialState)
export default store