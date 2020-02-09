// @flow

import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

import PostControls from './user-post-controls'
import postActions from '../action/posts'
import { HOME_PAGE_ROUTE } from '../routes'
import NOT_FOUND from '../dumb/not-found'
import {getImageURL} from '../config'

const mapStateToProps = (state) => {
  if (state.auth.get('user') && state.posts.get('posts')) {
    //console.log(`Posts? ${JSON.stringify(state.posts.get('posts'))}`)
    return {
      currentUserId: state.auth.get('user').get('_id'),
      post: state.posts.get('posts').get(0),
      refresh: state.posts.get('refresh'),
      error: state.posts.get('error'),
      redirectToHome: state.posts.get('redirectToHome'),
    }
  }
  else if (state.posts.get('posts')) {
    return {
      post: state.posts.get('posts').get(0),
      refresh: state.posts.get('refresh'),
      error: state.posts.get('error'),
      redirectToHome: state.posts.get('redirectToHome'),
    }
  }
  return {
    refresh: state.posts.get('refresh'),
    error: state.posts.get('error'),
    redirectToHome: state.posts.get('redirectToHome'),
  }
}

class SinglePostDisplay extends React.Component {
  constructor(props) {
    super(props)

    props.dispatch(postActions.scrubRedirect())
  }

  componentDidMount() {
    this.props.dispatch(postActions.fetchPostById(this.props.match.params.postId))
  }

  componentWillReceiveProps(nextProps) {
    // console.log(`NextProps: ${JSON.stringify(nextProps)}`)
    // console.log(`this page: ${this.props.match.params.pageNum} next page: ${nextProps.match.params.pageNum}`)
    if (nextProps.refresh) {
      console.log('Refreshing post...')
      this.forceUpdate()
      this.props.dispatch(postActions.scrubRedirect())
    }
  }

  render() {
    if (this.props.redirectToHome) {
      return (
        <Redirect to={HOME_PAGE_ROUTE} />
      )
    }

    if (this.props.post) {
      return (
        <div className="m-2 p-1">
          <Link to={HOME_PAGE_ROUTE} className="btn btn-secondary mb-3">&lt; Back</Link>
          <h3>{this.props.post.get('title')}</h3>
          <h5>by: {this.props.post.get('posterName')} on {this.props.post.get('date').slice(0,10)}</h5>
          {this.props.post.get('image')
            ? <img src={`${getImageURL(this.props.post.get('_id'))}#${new Date().getTime()}`} alt={this.props.post.get('title')} style={{ maxWidth:'100%'}} />
            : ''
          }
          <div className="mt-3">
            <p>{this.props.post.get('content')}</p>
          </div>
          {this.props.currentUserId === this.props.post.get('poster') ? <PostControls post={this.props.post} /> : ''}
        </div>
      )
    }

    if (this.props.error) {
      return (
        <NOT_FOUND />
      )
    }

    return (
      <h3>Loading...</h3>
    )
  }
}

export default connect(mapStateToProps)(SinglePostDisplay)
