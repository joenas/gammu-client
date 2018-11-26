import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import { routerMiddleware } from 'react-router-redux'

import smsApp from './reducers'

const loggerMiddleware = createLogger()

export default function configureStore(preloadedState, history) {
  const routingMiddleware = routerMiddleware(history)
  return createStore(
    smsApp,
    preloadedState,
    applyMiddleware(
      routingMiddleware,
      thunkMiddleware,
      loggerMiddleware
    )
  )
}
