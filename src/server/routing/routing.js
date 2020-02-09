// @flow

import {
  helloPage,
  helloAsyncPage,
  helloEndpoint,
} from '../controller'

import {
  HELLO_PAGE_ROUTE,
  HELLO_ASYNC_PAGE_ROUTE,
  helloEndpointRoute,
} from '../../shared/routes'

import routePages from './route-pages'
import routePosts from './route-posts'
import routeUsers from './route-users'
import routeAuth from './route-auth'
import renderApp from '../render-app'

export default (app: Object) => {

  routePages(app)
  routePosts(app)
  routeUsers(app)
  routeAuth(app)

  // route tutorial example functions
  app.get(HELLO_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, helloPage()))
  })

  app.get(HELLO_ASYNC_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, helloAsyncPage()))
  })

  app.get(helloEndpointRoute(), (req, res) => {
    res.json(helloEndpoint(req.params.num))
  })

  // route error handling
  app.get('/500', () => {
    throw Error('Fake Internal Server Error')
  })

  app.get('*', (req, res) => {
    res.status(404).send(renderApp(req.url))
  })

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.error(err.stack)
    res.status(500).send('Something went wrong!')
  })

  return app
}
