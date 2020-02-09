// @flow

/**
 * This module handles the reducer for updating posts
 */

import Immutable from 'immutable'
import type { fromJS as Immut } from 'immutable'

import {
  SET_VIEWED_POSTS,
  REMOVE_VIEWED_POSTS,
  NEW_POST_REQUEST,
  NEW_POST_SUCCESS,
  NEW_POST_FAILURE,
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  SCRUB_REDIRECT,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  DELETE_POST_REQUEST,
  FETCH_POST_EDIT_SUCCESS,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE,
  UPLOAD_REQUEST,
} from '../action/posts'

const initialState = Immutable.fromJS({
  posts: [],
  loading: false,
  error: null,
  total: 0,
  redirectToHome: false,
  redirect: false,
  edit: false,
})

const postReducer = (state: Immut = initialState, action: { type: string, payload: any}) => {
  // console.log(`action: ${JSON.stringify(action)}`)
  switch (action.type) {
    case DELETE_POST_REQUEST:
    case FETCH_POST_REQUEST:
    case UPLOAD_REQUEST:
    case NEW_POST_REQUEST:
      return state.merge({
        loading: true,
        edit: false,
      })
    case DELETE_POST_SUCCESS:
      return state.merge({
        loading: false,
        error: null,
        redirectToHome: true,
        edit: false,
      })
    case UPLOAD_SUCCESS:
    case NEW_POST_SUCCESS:
      // console.log(`New post success ${action.payload}`)
      return state.merge({
        loading: false,
        error: null,
        redirect: action.payload,
        edit: false,
      })
    case UPLOAD_FAILURE:
    case DELETE_POST_FAILURE:
    case FETCH_POST_FAILURE:
    case NEW_POST_FAILURE:
      return state.merge({
        loading: false,
        error: action.payload,
        edit: false,
      })
    case FETCH_POST_SUCCESS:
      // console.log(`payload: ${action.payload}`)
      return state.merge({
        posts: action.payload.posts,
        total: action.payload.total,
        loading: false,
        error: false,
        edit: false,
      })
    case SET_VIEWED_POSTS:
      return state.merge({
        posts: action.payload,
        loading: false,
        error: false,
        edit: false,
      })
    case REMOVE_VIEWED_POSTS:
      return state.merge({
        posts: [],
        loading: false,
        error: false,
        edit: false,
      })
    case SCRUB_REDIRECT:
      return state.merge({
        redirectToHome: false,
        redirect: false,
      })
    case FETCH_POST_EDIT_SUCCESS:
      // console.log(`Setting post to ${JSON.stringify(action.payload)}`)
      return state.merge({
        posts: [action.payload],
        loading: false,
        error: false,
        edit: true,
      })
    case UPLOAD_SUCCESS:
      return state.merge({
        refresh: true,
      })
    default:
      return state
  }
}

export default postReducer
