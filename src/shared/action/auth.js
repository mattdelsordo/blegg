// @flow

/**
 * This file contains actions dealing with logging in the user
 * TODO: describe how that process actually like works
 */
import 'isomorphic-fetch'

import { LOGIN_ROUTE, VERIFY_TOKEN_ROUTE, CREATE_ACCT_ROUTE } from '../routes'

export const LOGIN_REQUEST = 'USER_LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'USER_LOGIN_FAILURE'
export const NEW_USER_REQUEST = 'USER_CREATE_REQUEST'
export const NEW_USER_SUCCESS = 'USER_CREATE_SUCCESS'
export const NEW_USER_FAILURE = 'USER_CREATE_FAILURE'
export const LOGOUT = 'USER_LOGOUT'
export const USER_TOKEN = 'USER'

// Actions to dispatch on various results
const loginRequest = user => ({ type: LOGIN_REQUEST, payload: user })
const loginSuccess = user => ({ type: LOGIN_SUCCESS, payload: user })
const loginFailure = error => ({ type: LOGIN_FAILURE, payload: error })

const newUserRequest = user => ({ type: NEW_USER_REQUEST, payload: user })
const newUserSuccess = user => ({ type: NEW_USER_SUCCESS, payload: user })
const newUserFailure = error => ({ type: NEW_USER_FAILURE, payload: error })

const handleResponse = (response) => {
  // console.log(`Handling response: ${JSON.stringify(response)}`)
  if (!response.ok) return Promise.reject(response.statusText)
  return response.json()
}

// post to sign up url to add new user to the database
// const handleNewUser = (username, email, password) => {
//   // console.log(`Attempting to create new user ${username}/${email}/${password}`)
//   const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ name: username, email, hash_password: password }),
//   }
//
//   return fetch(CREATE_ACCT_ROUTE, requestOptions)
//     .then(handleResponse)
//     .then((bundle) => {
//       // console.log(`Got response from create-user: ${JSON.stringify(bundle)}`)
//       if (bundle && bundle.token && bundle.user) {
//         localStorage.setItem(USER_TOKEN, JSON.stringify(bundle.token))
//         return bundle.user
//       }
//       return null
//     })
//     .catch((err) => {
//       console.log(`Fetch error: ${err}`)
//     })
// }

const newUser = (username, email, password) => {
  return (dispatch) => {
    dispatch(newUserRequest({ username }))

    return fetch(CREATE_ACCT_ROUTE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: username, email, hash_password: password }),
    })
      .then(handleResponse)
      .then((res) => {
        if (res && res.token && res.user) {
          localStorage.setItem(USER_TOKEN, JSON.stringify(res.token))
          return dispatch(newUserSuccess(res.user))
        }
        return dispatch(newUserFailure('Sorry, something has gone wrong.'))
      })
      .catch((err) => {
        return dispatch(newUserFailure(err))
      })
    // handleNewUser(username, email, password)
    //   .then(
    //     (response) => {
    //       dispatch(newUserSuccess(response))
    //     },
    //     (error) => {
    //       dispatch(newUserFailure(error))
    //     },
    //   )
  }
}

// const handleLogin = (username, password) => {
//   console.log(`Attempting to handle login for ${username}/${password}`)
//   const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ username, password }),
//   }
//
//   return fetch(LOGIN_ROUTE, requestOptions)
//     .then(handleResponse)
//     .then((bundle) => {
//       console.log(`Got response: ${JSON.stringify(bundle)}`)
//       // login is successful if the response has a jwt token
//       if (bundle && bundle.user && bundle.token) {
//         // localStorage is used to store token between page refreshes
//         localStorage.setItem(USER_TOKEN, JSON.stringify(bundle.token))
//         // console.log(`Set user token to ${JSON.stringify(user)}.token`)
//         return bundle.user
//       }
//       return null
//     })
//     .catch((err) => {
//       return err
//     })
// }

const login = (username, password) => {
  console.log(`Attempting to log in ${username}/${password}`)
  return (dispatch) => {
    dispatch(loginRequest({ username }))
    // console.log('Middleware dispatch called.')
    return fetch(LOGIN_ROUTE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then(handleResponse)
      .then((response) => {
        if (response && response.user && response.token) {
          localStorage.setItem(USER_TOKEN, JSON.stringify(response.token))
          return dispatch(loginSuccess(response.user))
        }
        return dispatch(newUserFailure('Sorry, something has gone wrong.'))
      })
      .catch((err) => {
        return dispatch(loginFailure(err))
      })
    // handleLogin(username, password)
    //   .then(
    //     (response) => {
    //       dispatch(loginSuccess(response))
    //     },
    //     (error) => {
    //       dispatch(loginFailure(error))
    //     },
    //   )
  }
}

// const handleRestoreUser = (token) => {
//   const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({token}),
//   }
//
//   return fetch(VERIFY_TOKEN_ROUTE, requestOptions)
//     .then(handleResponse)
//     .then((bundle) => {
//       // console.log(`Got response: ${JSON.stringify(bundle)}`)
//       // login is successful if the response has a jwt token
//       if (bundle && bundle.user && bundle.token) {
//         // localStorage is used to store token between page refreshes
//         localStorage.setItem(USER_TOKEN, JSON.stringify(bundle.token))
//         // console.log(`Set user token to ${JSON.stringify(user)}.token`)
//         return bundle.user
//       }
//       return null
//     })
//     .catch((err) => {
//       // console.log(`Fetch error: ${err}`)
//     })
// }

const restoreUser = (token) => {
  return (dispatch) => {
    dispatch(loginRequest({ username: 'unknown_token' }))

    return fetch(VERIFY_TOKEN_ROUTE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({token}),
    })
      .then(handleResponse)
      .then((bundle) => {
        // console.log(`Got response: ${JSON.stringify(bundle)}`)
        // login is successful if the response has a jwt token
        if (bundle && bundle.user && bundle.token) {
          // localStorage is used to store token between page refreshes
          localStorage.setItem(USER_TOKEN, JSON.stringify(bundle.token))
          // console.log(`Set user token to ${JSON.stringify(user)}.token`)
          return dispatch(loginSuccess(bundle.user))
        }
        return dispatch(loginFailure('Sorry, something has gone wrong.'))
      })
      .catch((err) => {
        return dispatch(loginFailure(err))
      })
    // handleRestoreUser(token)
    //   .then(
    //     (response) => {
    //       dispatch(loginSuccess(response))
    //     },
    //     (error) => {
    //       dispatch(loginFailure(error))
    //     },
    //   )
  }
}

const logout = () => {
  // console.log(`Logging out user...`)
  localStorage.removeItem(USER_TOKEN)
  return { type: LOGOUT }
}

export default {
  newUser,
  login,
  logout,
  restoreUser,
  newUserFailure,
}
