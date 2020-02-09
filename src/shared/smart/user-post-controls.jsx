// @flow

/**
 * This component displays links to edit/delete functionality to be displayed if the poster of the post matches the
 * currently logged in user
 */

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import faDelete from '@fortawesome/fontawesome-free-solid/faTrash'
import $ from 'jquery'

import { USER_TOKEN } from '../action/auth'
import postActions from '../action/posts'
import { editPostRoute } from '../routes'

const ConfirmDeleteModal = ({ dispatch, postTitle, postId }) => (
  <div className="modal fade" id="delete-modal">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Delete this post?</h5>
          <button type="button" className="close" data-dismiss="modal">×</button>
        </div>
        <div className="modal-body">
          Are you sure you would like to delete "{postTitle}"?
        </div>
        <div className="modal-footer">

          <form
            onSubmit={(e) => {
              e.preventDefault()
              $('#delete-modal').modal('hide')
              dispatch(postActions.deletePost(postId))
            }}
          >
            <button
              id="delete-button"
              type="button"
              role="button"
              className="btn btn-secondary m-1"
              data-dismiss="modal"
            >No!
            </button>
            <button type="submit" role="button" className="btn btn-primary m-1">Yes</button>
          </form>

        </div>
      </div>
    </div>
  </div>
)

const PostControls = ({ dispatch, post }) => (
  <div className="breadcrumb d-inline-block container text-right" style={{width: '100%'}}>
    <Link to={editPostRoute(post.get('_id'))} >
      <span title="Edit Post" className="p-1">
        <FontAwesomeIcon icon={faEdit} />
      </span>
    </Link>
    <a href="#" type="button" role="button" data-toggle="modal" data-target="#delete-modal">
      <span title="Delete Post" className="p-1">
        <FontAwesomeIcon icon={faDelete} />
      </span>
    </a>
    <ConfirmDeleteModal dispatch={dispatch} postTitle={post.get('title')} postId={post.get('_id')} />
  </div>
)

export default connect()(PostControls)
