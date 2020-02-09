// @flow

/**
 * This module handles actions for updating posts that the app shows
 */

import 'isomorphic-fetch'

import {
  NEW_POST_PAGE_ROUTE,
  POST_DATA_ROUTE,
  deletePostRoute,
  editPostRoute,
  UPLOAD_ROUTE,
} from '../routes'
import { USER_TOKEN } from '../action/auth'

export const SET_VIEWED_POSTS = 'SET_VIEWED_POSTS'
export const REMOVE_VIEWED_POSTS = 'REMOVE_VIEWED_POSTS'
export const NEW_POST_REQUEST = 'REQUEST_NEW_POST'
export const NEW_POST_SUCCESS = 'NEW_POST_SUCCESS'
export const NEW_POST_FAILURE = 'NEW_POST_FAILURE'
export const FETCH_POST_REQUEST = 'FETCH_POST_REQUEST'
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS'
export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE'
export const SCRUB_REDIRECT = 'SCRUB_REDIRECT'
export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST'
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS'
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE'
export const FETCH_POST_EDIT_SUCCESS = 'FETCH_POST_EDIT_SUCCESS'
export const UPLOAD_REQUEST = 'UPLOAD_REQUEST'
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS'
export const UPLOAD_FAILURE = 'UPLOAD_FAILURE'

const setViewedPosts = posts => ({ type: SET_VIEWED_POSTS, payload: posts })
const removeViewedPosts = () => ({ type: REMOVE_VIEWED_POSTS })

const newPostRequest = title => ({ type: NEW_POST_REQUEST, payload: title })
const newPostSuccess = id => ({ type: NEW_POST_SUCCESS, payload: id })
const newPostFailure = err => ({ type: NEW_POST_FAILURE, payload: err })

const fetchPostRequest = id => ({ type: FETCH_POST_REQUEST, payload: id })
const fetchPostSuccess = posts => ({ type: FETCH_POST_SUCCESS, payload: posts })
const fetchPostFailure = err => ({ type: FETCH_POST_FAILURE, payload: err })

const fetchPostEditSuccess = posts => ({ type: FETCH_POST_EDIT_SUCCESS, payload: posts })

const scrubRedirect = () => ({ type: SCRUB_REDIRECT })

const deletePostRequest = id => ({ type: DELETE_POST_REQUEST, payload: id })
const deletePostSuccess = () => ({ type: DELETE_POST_SUCCESS })
const deletePostFailure = err => ({ type: DELETE_POST_FAILURE, payload: err })

const handleResponse = (response) => {
  // console.log(`Handling response: ${JSON.stringify(response)}`)
  if (!response.ok) return Promise.reject(response.statusText)
  return response.json()
}

const uploadImage = (file, name) => {
  return (dispatch) => {
    dispatch({ type: UPLOAD_REQUEST })
    console.log('Dispatched upload request.')

    const data = new FormData()
    data.append('file', file)
    data.append('filename', name)

    return fetch(UPLOAD_ROUTE, {
      method: 'POST',
      body: data,
    })
      .then(handleResponse)
      .then((response) => {
        console.log(`Upload success ${JSON.stringify(response)}`)
        return dispatch({ type: UPLOAD_SUCCESS, payload: name })
      })
      .catch(err => dispatch({ type: UPLOAD_FAILURE, payload: err }))
  }
}

const deletePost = (postId) => (dispatch) => {
  const token = JSON.parse(localStorage.getItem(USER_TOKEN))

  dispatch(deletePostRequest(postId))
  // console.log(`dispatched delete post request for ${postId}`)
  return fetch(deletePostRoute(), {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, postId }),
  })
    .then((response) => {
      // console.log(`Got response ${JSON.stringify(response)}`)
      if (!response.ok) return Promise.reject(response.statusText)
      return dispatch(deletePostSuccess())
    })
    .catch((err) => {
      dispatch(deletePostFailure(err))
    })
}

// const handleNewPost = (title, image, content) => {
//   const token = JSON.parse(localStorage.getItem(USER_TOKEN))
//
//   const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ token, post: { title, image: image !== undefined, content } }),
//   }
//
//   return fetch(NEW_POST_PAGE_ROUTE, requestOptions)
//     .then(handleResponse)
//     .then((bundle) => {
//       console.log(`Got bundle back from new post ${JSON.stringify(bundle)}`)
//       if (bundle && bundle._id) return bundle._id
//       return null
//     })
//     .catch((err) => {
//       console.log(`Fetch error: ${err}`)
//     })
// }

const newPost = (title, image, content) => {
  return (dispatch) => {
    dispatch(newPostRequest({ title }))

    const token = JSON.parse(localStorage.getItem(USER_TOKEN))

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, post: { title, image: image !== undefined, content } }),
    }

    return fetch(NEW_POST_PAGE_ROUTE, requestOptions)
      .then(handleResponse)
      .then((bundle) => {
        console.log(`Got bundle back from new post ${JSON.stringify(bundle)}`)
        if (bundle && bundle._id) {
          if (image) dispatch(uploadImage(image, bundle._id))
          return dispatch(newPostSuccess(bundle._id))
        }
        return dispatch(newPostFailure('Sorry, something has gone wrong.'))
      })
      .catch((err) => {
        return dispatch(newPostFailure(err))
      })

    // handleNewPost(title, image, content)
    //   .then(
    //     (response) => {
    //       if (response) {
    //         console.log(`Post posted successfully (${response})`)
    //         if (image) dispatch(uploadImage(image, response))
    //         else dispatch(newPostSuccess(response))
    //       } else {
    //         dispatch(newPostFailure('New post null??'))
    //       }
    //     },
    //     (error) => {
    //       dispatch(newPostFailure(error))
    //     },
    //   )
  }
}

// const handleFetchPostsByRange = (start, end) => {
//   const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ start, end }),
//   }
//
//   return fetch(POST_DATA_ROUTE, requestOptions)
//     .then(handleResponse)
//     .then((bundle) => {
//       if (bundle){
//         // console.log(`Got bundle ${JSON.stringify(bundle)}`)
//         return bundle
//       }
//       return null
//     })
//     .catch((err) => {
//       console.log(`Fetch error: ${err}`)
//     })
// }

// action to fetch a range of posts
const fetchPostsByRange = (start, end) => {
  return (dispatch) => {
    dispatch(fetchPostRequest(`Fetching ${start}-${end}`))

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start, end }),
    }

    return fetch(POST_DATA_ROUTE, requestOptions)
      .then(handleResponse)
      .then((bundle) => {
        if (bundle){
          // console.log(`Got bundle ${JSON.stringify(bundle)}`)
          return dispatch(fetchPostSuccess(bundle))
        }
        return dispatch(fetchPostFailure('Sorry, something has gone wrong.'))
      })
      .catch((err) => {
        return dispatch(fetchPostFailure(err))
      })

    // handleFetchPostsByRange(start, end)
    //   .then(
    //     (response) => {
    //       if (response) {
    //         // console.log(`Got response ${JSON.stringify(response)}`)
    //         dispatch(fetchPostSuccess(response))
    //       }
    //       else dispatch(fetchPostFailure('Posts null??'))
    //     },
    //     (error) => {
    //       dispatch(fetchPostFailure(error))
    //     },
    //   )
  }
}

// const handleFetchPostById = (id) => {
//   const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ id }),
//   }
//
//   return fetch(POST_DATA_ROUTE, requestOptions)
//     .then(handleResponse)
//     .then((bundle) => {
//       // console.log(`Got bundle ${JSON.stringify(bundle)}`)
//       if (bundle) return bundle
//       return null
//     })
//     .catch((err) => {
//       console.log(`Fetch error: ${err}`)
//     })
// }

// action to fetch a post by its id
const fetchPostById = (id) => {
  return (dispatch) => {
    dispatch(fetchPostRequest(`Fetching ${id}`))

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    }

    return fetch(POST_DATA_ROUTE, requestOptions)
      .then(handleResponse)
      .then((bundle) => {
        // console.log(`Got bundle ${JSON.stringify(bundle)}`)
        if (bundle) return dispatch(fetchPostSuccess({ posts: [bundle] }))
        return dispatch(fetchPostFailure('Sorry, something has gone wrong.'))
      })
      .catch((err) => {
        dispatch(fetchPostFailure(err))
      })

    // handleFetchPostById(id)
    //   .then(
    //     (response) => {
    //       if (response) {
    //         dispatch(fetchPostSuccess({ posts: [response] }))
    //       }
    //       else dispatch(fetchPostFailure('Post null??'))
    //     },
    //     (error) => {
    //       dispatch(fetchPostFailure(error))
    //     },
    //   )
  }
}

// const handleFetchPostToEdit = (id) => {
//   console.log(`Handling fetch of ${id}`)
//   const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ id }),
//   }
//
//   return fetch(POST_DATA_ROUTE, requestOptions)
//     .then(handleResponse)
//     .then((bundle) => {
//       if (bundle) return bundle
//       return null
//     })
//     .catch((err) => {
//       console.log(`Fetch error: ${err}`)
//     })
// }

// action to fetch a post by its id
const fetchPostToEdit = (id) => {
  return (dispatch) => {
    dispatch(fetchPostRequest(`Fetching ${id}`))

    console.log(`Handling fetch of ${id}`)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    }

    return fetch(POST_DATA_ROUTE, requestOptions)
      .then(handleResponse)
      .then((bundle) => {
        if (bundle) return dispatch(fetchPostEditSuccess(bundle))
        return dispatch(fetchPostFailure('Sorry, something has gone wrong.'))
      })
      .catch((err) => {
        return dispatch(fetchPostFailure(err))
      })

    // handleFetchPostToEdit(id)
    //   .then(
    //     (response) => {
    //       if (response) {
    //         console.log(`Got response ${JSON.stringify(response)}`)
    //         dispatch(fetchPostEditSuccess(response))
    //       }
    //       else dispatch(fetchPostFailure('Post null??'))
    //     },
    //     (error) => {
    //       dispatch(fetchPostFailure(error))
    //     },
    //   )
  }
}

const updatePost = (_id, title, image, content) => (dispatch) => {
  const token = JSON.parse(localStorage.getItem(USER_TOKEN))
  dispatch(newPostRequest(_id))
  console.log(`dispatched update post request for ${_id}`)
  console.log(`got image ${image}`)
  return fetch(editPostRoute(_id), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, post: { _id, title, image: image !== undefined, content } }),
  })
    .then(handleResponse)
    .then((response) => {
      console.log(`Got response ${JSON.stringify(response)}`)
      if (response) {
        if (image !== undefined) return dispatch(uploadImage(image, response._id))
        return dispatch(newPostSuccess(response._id))
      }
      return dispatch(newPostFailure('Sorry, something has gone wrong!'))
    })
    .catch((err) => {
      dispatch(newPostFailure(err))
    })
}

export default {
  newPost,
  setViewedPosts,
  removeViewedPosts,
  fetchPostsByRange,
  fetchPostById,
  scrubRedirect,
  deletePost,
  fetchPostToEdit,
  updatePost,
  uploadImage,
}
