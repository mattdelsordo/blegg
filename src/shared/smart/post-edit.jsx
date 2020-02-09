// @flow

/**
 * This component consists of a text area for the user to enter text and a button to submit it.
 * The onSubmit function should send the content of the textarea to the server to be formatted as a post
 */

import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import posts from '../action/posts'
import { HOME_PAGE_ROUTE, postPageRoute } from '../routes'
import {getImageURL} from '../config'

const mapStateToProps = state => ({
  redirectToHome: state.posts.get('redirectToHome'),
  redirect: state.posts.get('redirect'),
})

class PostEditor extends React.Component {
  constructor(props) {
    super(props)

    props.dispatch(posts.scrubRedirect())
  }

  render() {
    let title
    let content
    let image
    let imageDisplay

    // console.log(`Redirect? ${this.props.redirectToHome}`)
    if (this.props.redirect) {
      return (
        <Redirect to={postPageRoute(this.props.redirect)} />
      )
    }

    if (this.props.redirectToHome) {
      return (
        <Redirect to={HOME_PAGE_ROUTE} />
      )
    }

    // console.log(`Editor has post ${this.props.post}`)
    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault()

            if (this.props.post) {
              // update post if there's a post
              console.log(`Updating post ${this.props.post.get('_id')}`)
              this.props.dispatch(posts.updatePost(this.props.post.get('_id'), title.value, image.files[0], content.value))
            } else {
              console.log(`Dispatching post ${title.value}, ${image.files[0]}, ${content.value}`)
              this.props.dispatch(posts.newPost(title.value, image.files[0], content.value))
            }

          }}
        >
          <div className="form-group">
            <label
              htmlFor="post-title-input"
            >
              Title
            </label>
            <input
              id="post-title-input"
              className="form-control"
              type="text"
              ref={(node) => {
                title = node
              }}
              defaultValue={this.props.post ? this.props.post.get('title') : ''}
              required
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="post-image-input"
            >
              Image
            </label>
            <input
              id="post-image-input"
              className="form-control"
              type="file"
              name="image"
              accept="image/*"
              ref={(node) => {
                image = node
              }}
              onChange={() => {
                console.log('Attempting to update image...')
                if (image.files && image.files[0]) {
                  console.log('File exists')
                  const reader = new FileReader()
                  reader.onload = (e) => {
                    imageDisplay.src = e.target.result
                  }
                  reader.readAsDataURL(image.files[0])

                }
              }}
            />
            {this.props.post && this.props.post.get('image')
              ? <img
                  src={`${getImageURL(this.props.post.get('_id'))}#${new Date().getTime()}`}
                  alt={this.props.post.get('_id')}
                  ref={(img) => {
                    imageDisplay = img
                  }}
                  style={{maxWidth: '100%'}}
                />
              : <img
                ref={(img) => {
                  imageDisplay = img
                }}
                style={{maxWidth: '100%'}}
              />
            }
          </div>
          <textarea
            className="form-control"
            rows="5"
            ref={(node) => {
              content = node
            }}
            required
            defaultValue={this.props.post ? this.props.post.get('content') : ''}
          />
          <button
            className="btn btn-primary float-right mt-1"
            type="submit"
          >
            {this.props.post ? 'Update' : 'Publish' }
          </button>
        </form>
      </div>
    )
  }
}

// const PostEditor = ({ dispatch, redirectToHome } : Props) => {
//
// }

export default connect(mapStateToProps)(PostEditor)
