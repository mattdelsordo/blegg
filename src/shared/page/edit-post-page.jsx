// @flow

/**
 * This page contains a post editor component and allows the user to edit a post
 */

import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'

import PostEditor from '../smart/post-edit'
import NavPage from '../layout/nav-page'
import NotFound from '../dumb/not-found'
import postActions from '../action/posts'
import {HOME_PAGE_ROUTE, postPageRoute} from '../routes'
import posts from '../action/posts'

const mapStateToProps = state => ({
  post: state.posts.get('edit') ? state.posts.get('posts').get(0) : null,
  redirectToHome: state.posts.get('redirectToHome'),
  redirect: state.posts.get('redirect'),
  error: state.posts.get('error'),
})

class NewPostPage extends React.Component {
  constructor(props) {
    super(props)

    this.props.dispatch(posts.scrubRedirect())
  }

  componentDidMount() {
    console.log(`Trying to fetch post ${this.props.match.params.postId}`)
    this.props.dispatch(postActions.fetchPostToEdit(this.props.match.params.postId))
  }

  render() {
    console.log(`Redirect? ${this.props.redirect}`)
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

    let thingToDisplay
    if (this.props.post) thingToDisplay = ( <PostEditor post={this.props.post} />)
    else if (this.props.error) thingToDisplay = ( <div>
      <div className="alert alert-danger">{this.props.error}</div>
      <Link to={HOME_PAGE_ROUTE} className="btn btn-secondary mb-3">&lt; Home</Link>
    </div> )
    else thingToDisplay = (<h3>Loading...</h3>)

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Edit Post</h1>
            {thingToDisplay}
          </div>
        </div>
      </div>
    )
  }
}

// const NewPostPage = ({}:Props) => (
//
// )

export default connect(mapStateToProps)(NavPage(NewPostPage))
