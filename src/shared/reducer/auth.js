// @flow

import Immutable from 'immutable'
import type { fromJS as Immut } from 'immutable'

import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  NEW_USER_FAILURE,
  NEW_USER_REQUEST,
  NEW_USER_SUCCESS,
  LOGOUT,
} from '../action/auth'

// initialize state with a user if one has already logged in
// const user = JSON.parse(localStorage.getItem(auth.USER_TOKEN))
// // const initialState = user ? Immutable.fromJS({ loggedIn: true, user }) : {}
const initialState = Immutable.fromJS({
  loggedIn: false,
  loggingIn: false,
  user: null,
  error: null,
})

const authenticationReducer = (state: Immut = initialState, action: { type: string, payload: any }) => {
  // console.log(`Dispatch IS happening ${action.type}`)
  // console.log(`State: ${JSON.stringify(state)}`)

  switch (action.type) {
    case NEW_USER_REQUEST:
    case LOGIN_REQUEST:
      // console.log(`State before ${action.type}: ${state}`)
      return state.merge({
        loggingIn: true,
        user: { name: action.payload.username },
      })
    case NEW_USER_SUCCESS:
    case LOGIN_SUCCESS:
      // console.log(`State before ${action.type}: ${state}`)
      let s = state.merge({
        loggedIn: true,
        loggingIn: false,
        user: action.payload,
        error: null,
      })
      // console.log(`State: ${JSON.stringify(s)}`)
      return s
    case NEW_USER_FAILURE:
    case LOGIN_FAILURE:
      let s1 = state.merge({
        error: action.payload,
        loggedIn: false,
        loggingIn: false,
        user: null,
      })
      // console.log(`State: ${JSON.stringify(s1)}`)
      return s1
    case LOGOUT:
      // console.log(`Logging out ${state.auth.get('user').name}`)
      return state.merge({
        loggingIn: false,
        loggedIn: false,
        user: null,
        error: null,
      })
    default:
      return state
  }
}

export default authenticationReducer

