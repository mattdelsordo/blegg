// @flow

import {
  HOME_PAGE_ROUTE,
  blogPageRoute,
  LOGIN_PAGE_ROUTE,
  SETTINGS_PAGE_ROUTE,
  NEW_POST_PAGE_ROUTE,
  HELLO_PAGE_ROUTE,
  postPageRoute,
} from '../../shared/routes'
import renderApp from '../render-app'
import { homePage, loginPage } from '../controller'
import { getPostPage } from '../db/post'

/**
 * Handles routing for all GETs that return HTML pages
 */

import { getBlogInfo } from '../db/user'

export default (app: Object) => {

  // render landing page
  app.get(HOME_PAGE_ROUTE, (req, res) => {
    res.status(200).send(renderApp(req.url, homePage()))
  })

  // render a specific page of the blog
  app.get(blogPageRoute(), (req, res) => {
    res.send(renderApp(req.url, homePage()))
  })

  // render login page
  app.get(LOGIN_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, loginPage()))
  })

  // render settings page
  app.get(SETTINGS_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, homePage()))
  })

  // render post creation page
  app.get(NEW_POST_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, homePage()))
  })

  // render a page for a specific post
  app.get(postPageRoute(), (req, res) => {
    res.send(renderApp(req.url, homePage()))
  })

  app.get(HELLO_PAGE_ROUTE, (req, res) => {
    getBlogInfo(req, res)
  })
}
