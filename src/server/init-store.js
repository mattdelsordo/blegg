// @flow

import Immutable from 'immutable'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import helloReducer from '../shared/reducer/hello'
import authReducer from '../shared/reducer/auth'
import postReducer from '../shared/reducer/posts'

const initStore = (plainPartialState: ?Object) => {
  const preloadedState = plainPartialState ? {} : undefined

  if (plainPartialState && plainPartialState.hello) {
    // flow-disable-next-line
    preloadedState.hello = helloReducer(undefined, {})
      .merge(Immutable.fromJS(plainPartialState.hello))
  }
  if (plainPartialState && plainPartialState.auth) {
    // flow-disable-next-line
    preloadedState.auth = authReducer(undefined, {})
      .merge(Immutable.fromJS(plainPartialState.auth))
  }

  if (plainPartialState && plainPartialState.posts) {
    // flow-disable-next-line
    preloadedState.posts = postReducer(undefined, {})
      .merge(Immutable.fromJS(plainPartialState.posts))
  }

  return createStore(combineReducers({ hello: helloReducer, auth: authReducer, posts: postReducer }),
    preloadedState, applyMiddleware(thunkMiddleware))
}

export default initStore
