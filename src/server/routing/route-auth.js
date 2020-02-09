// @flow

import {
  VERIFY_TOKEN_ROUTE,
  LOGIN_ROUTE,
  CREATE_ACCT_ROUTE,
} from '../../shared/routes'

/**
 * Handles routing for user authorization necessities
 */

import * as dbAuth from '../db/authenticate'

export default (app: Object) => {

  // verify an existing token is valid
  app.post(VERIFY_TOKEN_ROUTE, (req, res) => {
    dbAuth.verifyToken(req, res)
  })

  // log a user in
  app.post(LOGIN_ROUTE, (req, res) => {
    console.log('Made it to login route.')
    dbAuth.signIn(req, res)
  })

  // create new user account
  app.post(CREATE_ACCT_ROUTE, (req, res) => {
    dbAuth.register(req, res)
  })
}
