import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import messages from './messages'

const smsApp = combineReducers({
  messages,
  routerReducer
})

export default smsApp
