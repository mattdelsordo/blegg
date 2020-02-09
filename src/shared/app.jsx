// @flow

import React from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'
import Helmet from 'react-helmet'

import { APP_NAME, FAVICON_PATH } from './config'
import Nav from './smart/nav'
import HomePage from './page/home'
import HelloPage from './page/hello'
import HelloAsyncPage from './page/hello-async'
import NotFoundPage from './page/not-found'
import SignUpPage from './page/signup-page'
import Blog from './page/blog-page'
import LogIn from './page/login-page'
import NewPost from './page/new-post-page'
import SettingsPage from './page/settings-page'
import EditPostPage from './page/edit-post-page'

import {
  HOME_PAGE_ROUTE,
  HELLO_PAGE_ROUTE,
  HELLO_ASYNC_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  NEW_POST_PAGE_ROUTE,
  SETTINGS_PAGE_ROUTE,
  SIGN_UP_PAGE_ROUTE,
  editPostRoute,
  blogPageRoute,
  postPageRoute,
} from './routes'

const App = () => (
  <div>
    <link rel="icon" href={FAVICON_PATH} />
    <Helmet titleTemplate={`%s | ${APP_NAME}`} defaultTitle={APP_NAME} />
    <Switch>
      <Route exact path={LOGIN_PAGE_ROUTE} render={() => <LogIn />} />
      <Route exact path={SETTINGS_PAGE_ROUTE} render={() => <SettingsPage />} />
      <Route exact path={HELLO_ASYNC_PAGE_ROUTE} render={() => <HelloAsyncPage />} />
      <Route exact path={SIGN_UP_PAGE_ROUTE} render={() => <SignUpPage />} />

      <Route exact path={HOME_PAGE_ROUTE} render={() => <Blog />} />
      <Route exact path={editPostRoute()} component={EditPostPage} />
      <Route exact path={blogPageRoute()} render={() => <Blog />} />
      <Route exact path={HOME_PAGE_ROUTE} render={() => <Blog />} />
      <Route exact path={postPageRoute()} render={() => <Blog />} />
      <Route exact path={NEW_POST_PAGE_ROUTE} render={() => <NewPost />} />

      <Route component={NotFoundPage} />
    </Switch>
  </div>
)

export default App
