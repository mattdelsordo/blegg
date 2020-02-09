// @flow

import 'isomorphic-fetch'

import { createAction } from 'redux-actions'
import { helloEndpointRoute, HELLO_PAGE_ROUTE } from '../routes'

export const SAY_HELLO = 'SAY_HELLO'
export const SAY_HELLO_ASYNC_REQUEST = 'SAY_HELLO_ASYNC_REQUEST'
export const SAY_HELLO_ASYNC_SUCCESS = 'SAY_HELLO_ASYNC_SUCCESS'
export const SAY_HELLO_ASYNC_FAILURE = 'SAY_HELLO_ASYNC_FAILURE'
export const FETCH_UI_REQUEST = 'UI_REQUEST'
export const FETCH_UI_SUCCESS = 'UI_SUCCESS'
export const FETCH_UI_FAILURE = 'UI_FAILURE'

export const sayHello = createAction(SAY_HELLO)
export const sayHelloAsyncRequest = createAction(SAY_HELLO_ASYNC_REQUEST)
export const sayHelloAsyncSuccess = createAction(SAY_HELLO_ASYNC_SUCCESS)
export const sayHelloAsyncFailure = createAction(SAY_HELLO_ASYNC_FAILURE)

const fetchUiRequest = () => ({ type: FETCH_UI_REQUEST })
const fetchUiSuccess = data => ({ type: FETCH_UI_SUCCESS, payload: data })
const fetchUiFailure = err => ({ type: FETCH_UI_FAILURE, payload: err })

export const sayHelloAsync = (num: number) => (dispatch: Function) => {
  dispatch(sayHelloAsyncRequest())
  return fetch(helloEndpointRoute(num), { method: 'GET' })
    .then((res) => {
      if (!res.ok) throw Error(res.statusText)
      return res.json()
    })
    .then((data) => {
      if (!data.serverMessage) throw Error('No message received')
      dispatch(sayHelloAsyncSuccess(data.serverMessage))
    })
    .catch(() => {
      dispatch(sayHelloAsyncFailure())
    })
}

// const handleFetchUiData = () => {
//   return fetch(HELLO_PAGE_ROUTE, { method: 'GET' })
//     .then((res) => {
//       if (!res.ok) return Promise.reject(res.statusText)
//       return res.json()
//     })
//     .then((bundle) => {
//       if (bundle) return bundle
//       return null
//     })
//     .catch((err) => {
//       console.log(`Fetch UI error: ${err}`)
//     })
// }

export const fetchUiData = () => {
  return (dispatch) => {
    dispatch(fetchUiRequest())

    return fetch(HELLO_PAGE_ROUTE, { method: 'GET' })
      .then((res) => {
        if (!res.ok) return Promise.reject(res.statusText)
        return res.json()
      })
      .then((bundle) => {
        if (bundle) return dispatch(fetchUiSuccess(bundle))
        return dispatch(fetchUiFailure('Sorry, something has gone wrong.'))
      })
      .catch((err) => {
        dispatch(fetchUiFailure(err))
      })

    // handleFetchUiData()
    //   .then(
    //     (response) => {
    //       // console.log(`Got response ${JSON.stringify(response)}`)
    //       dispatch(fetchUiSuccess(response))
    //     },
    //     (error) => {
    //       dispatch(fetchUiFailure(error))
    //     },
    //   )
  }
}
