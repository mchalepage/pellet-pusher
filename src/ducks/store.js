import userReducer from './userReducer'
import patientReducer from './patientReducer'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import {composeWithDevTools} from 'redux-devtools-extension'

const rootReducer = combineReducers({userReducer, patientReducer})

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(promiseMiddleware)))