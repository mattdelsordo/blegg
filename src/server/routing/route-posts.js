// @flow

/**
 * Handles routing for all routes that involve creating, editing, and getting post data
 */

import {
  NEW_POST_PAGE_ROUTE,
  editPostRoute,
  deletePostRoute,
  POST_DATA_ROUTE,
  UPLOAD_ROUTE,
} from '../../shared/routes'

import * as dbPosts from '../db/post'

export default (app: Object) => {

  // create a new post in the database
  // save any image to the server and store the resulting URL
  app.post(NEW_POST_PAGE_ROUTE, (req, res) => {
    dbPosts.createPost(req, res)
  })

  // update a post's database entry with new data
  app.put(editPostRoute(), (req, res) => {
    dbPosts.editPost(req, res)
  })

  // delete a post's entry from the database
  // also delete respective photo url
  app.delete(deletePostRoute(), (req, res) => {
    dbPosts.deletePost(req, res)
  })

  // get the data for one or more posts from the database
  // this should be used for rendering groups of posts on the landing page
  // rather than the individual post pages, which can just use their own URL
  app.post(POST_DATA_ROUTE, (req, res) => {
    if (req.body.id) dbPosts.getPostJson(req, res)
    else dbPosts.getPostListJson(req, res)
  })

  // upload file to server
  // not actually handled by the DB but I didn't know where else to put this code
  app.post(UPLOAD_ROUTE, (req, res) => {
    dbPosts.uploadFile(req, res)
  })
}
