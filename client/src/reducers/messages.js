import {
  INVALIDATE_ITEMS,
  REQUEST_ITEMS,
  RECEIVE_ITEMS,
  ADD_ITEM,
  SET_NUMBER,
  SET_NUMBER_ERROR
} from '../actions'
import union from 'lodash/union'

function setNumber(state, action) {
  return Object.assign({}, state, {
    number: action.number,
  })
}

function setNumberError(state, action) {
  const {number, message} = action
  const newErrors = {...state.numberErrors, [number] : message}
  return Object.assign({}, state, {
    numberErrors: newErrors
  })
}

function addItem(state, action) {
  const {item} = action
  const {items, ids} = state
  const number = item.number
  var newIds = ids.slice()
  var messages = []
  if (ids.includes(number)) {
    messages = items[number].slice()
  } else {
    newIds.unshift(number)
  }
  messages.unshift(item)
  const newItems = {...items, [number] : messages}
  // TODO separate action
  const newErrors = state.numberErrors
  delete newErrors[number]
  return Object.assign({}, state, {
    items: newItems,
    ids: newIds,
    number: '',
    numberErrors: newErrors
  })
}

function receiveItems(state, action) {
  const ids = union(action.response.ids, state.ids).slice()
  const items = Object.assign({}, action.response.items, state.items)
  let itemsToKeep = {}
  ids.forEach(id => itemsToKeep[id] = items[id])
  return Object.assign({}, state, {
    isFetching: false,
    didInvalidate: false,
    items: itemsToKeep,
    ids: ids
  })
}

function news(
  state = {
    isFetching: true,
    didInvalidate: false,
    items: {},
    ids: [],
    number: '',
    numberErrors: {}
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_ITEMS:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_ITEMS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_ITEMS:
      return receiveItems(state, action)
    case ADD_ITEM:
      return addItem(state, action)
    case SET_NUMBER:
      return setNumber(state, action)
    case SET_NUMBER_ERROR:
      return setNumberError(state, action)
    default:
      return state
  }
}

export default news

