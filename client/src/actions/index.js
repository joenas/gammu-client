
// General
export const SET_NUMBER = 'SET_NUMBER'
export const setNumber = number => {
  return {
    type: SET_NUMBER,
    number
  }
}

// Item actions
export const SET_ITEM_READ = 'SET_ITEM_READ'
export const ADD_ITEM = 'ADD_ITEM'
export const SET_NUMBER_ERROR = 'SET_NUMBER_ERROR'

export const setRead = id => {
  return {
    type: SET_ITEM_READ,
    id
  }
}

export const addItem = item => {
  return {
    type: ADD_ITEM,
    item
  }
}

export const setNumberError = (number, message) => {
  return {
    type: SET_NUMBER_ERROR,
    number,
    message
  }
}

export function sendItem(params) {
  params['api_key'] = process.env.REACT_APP_GAMMU_API_KEY

  return (dispatch, getState) => {
    fetch('sms.json', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(params)
    })
    .then((response) => {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json())
    .then(json => dispatch(addItem(json)))
    .catch(error => dispatch(setNumberError(params.number, error.message)));
  }

}

export function invalidateItems() {
  return {
    type: INVALIDATE_ITEMS
  }
}

// Items list actions

export const REQUEST_ITEMS = 'REQUEST_ITEMS'
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS'
export const INVALIDATE_ITEMS = 'INVALIDATE_ITEMS'

function requestItems() {
  return {
    type: REQUEST_ITEMS
  }
}

function receiveItems(json) {
  return {
    type: RECEIVE_ITEMS,
    response: json
  }
}

function fetchItems() {
  let query = '/sms.json'
  return fetch(query, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
}

export function checkForNewItems() {
  return (dispatch, getState) => {
    dispatch(requestItems())
    fetchItems().then(json => dispatch(receiveItems(json)))
  }
}

function shouldFetchItems(state) {
  const messages = state.messages
  if (!messages.items || messages.ids.length === 0) {
    return true
  } else if (messages.isFetching) {
    return false
  } else {
    return messages.didInvalidate
  }
}

export function fetchItemsIfNeeded() {
  return (dispatch, getState) => {
    const state = getState()
    if (shouldFetchItems(state)) {
      return dispatch(checkForNewItems())
    }
  }
}
