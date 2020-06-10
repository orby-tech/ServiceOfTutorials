import  { combineReducers} from 'redux'

import  { createMultilanguageReducer } from "redux-multilanguage";
import  {  } from './types'

//initial state




export const rootReducer = combineReducers({
    multilanguage: createMultilanguageReducer({ currentLanguageCode: "en" })
})