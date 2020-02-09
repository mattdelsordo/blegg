// @flow

import Immutable from 'immutable'
import type { fromJS as Immut } from 'immutable'

import {
  SAY_HELLO,
  SAY_HELLO_ASYNC_REQUEST,
  SAY_HELLO_ASYNC_SUCCESS,
  SAY_HELLO_ASYNC_FAILURE,
  FETCH_UI_REQUEST,
  FETCH_UI_SUCCESS,
  FETCH_UI_FAILURE,
} from '../action/hello'
import { __user__ } from '../default'

const initialState = Immutable.fromJS({
  message: 'Initial reducer message',
  messageAsync: 'Initial reducer message for async call',
  title: 'Loading blog info...',
  bio: 'Loading blog info...',
  propic: 'Loading blog info...',
  name: 'Loading blog info...',
  error: null,
  loading: false,
})

const helloReducer = (state: Immut = initialState, action: { type: string, payload: any }) => {

  switch (action.type) {
    case SAY_HELLO:
      // console.log(`State before ${action.type}: ${state}`)
      return state.set('message', action.payload)
    case SAY_HELLO_ASYNC_REQUEST:
      // console.log(`State before ${action.type}: ${state}`)
      return state.set('messageAsync', 'Loading...')
    case SAY_HELLO_ASYNC_SUCCESS:
      // console.log(`State before ${action.type}: ${state}`)
      return state.set('messageAsync', action.payload)
    case SAY_HELLO_ASYNC_FAILURE:
      // console.log(`State before ${action.type}: ${state}`)
      return state.set('messageAsync', 'No message received, please check your connection')
    case FETCH_UI_REQUEST:
      return state.merge({
        loading: true,
      })
    case FETCH_UI_FAILURE:
      return state.merge({
        loading: false,
        error: 'Unable to load blog information!',
      })
    case FETCH_UI_SUCCESS:
      // console.log(`UI payload: ${JSON.stringify(action.payload)}`)
      return state.merge({
        loading: false,
        error: null,
        title: action.payload.title,
        bio: action.payload.bio,
        propic: action.payload.propic,
        name: action.payload.name,
      })
    default:
      return state
  }
}

export default helloReducer
