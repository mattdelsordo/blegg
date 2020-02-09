// @flow

import 'babel-polyfill'
import Immutable from 'immutable'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'
import $ from 'jquery'
import Tether from 'tether'

import App from '../shared/app'
import helloReducer from '../shared/reducer/hello'
import authenticationReducer from '../shared/reducer/auth'
import postReducer from '../shared/reducer/posts'
import authActions, { USER_TOKEN } from '../shared/action/auth'
import { fetchUiData } from '../shared/action/hello'
import { APP_CONTAINER_SELECTOR } from '../shared/config'
import { isProd } from '../shared/util'

window.jQuery = $
window.Tether = Tether
require('bootstrap')

/* eslint-disable no-underscore-dangle */
const composeEnhancers = (isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
const preloadedState = window.__PRELOADED_STATE__
/* eslint-enable no-underscore-dangle */

const store = createStore(
  combineReducers({ hello: helloReducer, auth: authenticationReducer, posts: postReducer }),
  {
    hello: Immutable.fromJS(preloadedState.hello),
    auth: Immutable.fromJS(preloadedState.auth),
    posts: Immutable.fromJS(preloadedState.posts),
  },
  composeEnhancers(applyMiddleware(thunkMiddleware)),
)

// refresh ui with blog data
store.dispatch(fetchUiData())

// refresh store with the user if they're already logged in
const token = JSON.parse(localStorage.getItem(USER_TOKEN))
if (token) store.dispatch(authActions.restoreUser(token))

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR)

const wrapApp = (AppComponent, reduxStore) => (
  <Provider store={reduxStore}>
    <BrowserRouter>
      <AppContainer>
        <AppComponent />
      </AppContainer>
    </BrowserRouter>
  </Provider>
)


ReactDOM.render(wrapApp(App, store), rootEl)

if (module.hot) {
  // flow-disable-next-line
  module.hot.accept('../shared/app', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('../shared/app').default
    ReactDOM.render(wrapApp(NextApp, store), rootEl)
  })
}
