// @flow

/**
 * Handles routing for all user detail update functions
 * Don't prioritize these there's lots of them and they aren't strictly necessary
 */

import {
  userPicRoute,
  userBioRoute,
  userTitleRoute,
  userNameRoute,
  userPassRoute,
  userEmailRoute,
} from '../../shared/routes'

export default (app: Object) => {

  // update profile picture
  app.put(userPicRoute(), (req, res) => {
    // TODO: implement this
  })

  app.put(userBioRoute(), (req, res) => {
    // TODO: implement this
  })

  app.put(userTitleRoute(), (req, res) => {
    // TODO: implement this
  })

  app.put(userNameRoute(), (req, res) => {
    // TODO: implement this
  })

  app.put(userPassRoute(), (req, res) => {
    // TODO: implement this
  })

  app.put(userEmailRoute(), (req, res) => {
    // TODO: implement this
  })
}
