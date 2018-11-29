import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import throttle from 'lodash/throttle'
import createHistory from 'history/createBrowserHistory'

import { loadState, saveState } from './localStorage'
import configureStore from './configureStore'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

const initialState = loadState()
const history = createHistory()
const store = configureStore(initialState, history)

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

ReactDOM.render(
  <Provider store={store}>
    <App history={history}/>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker();
