// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Post from './post-box'
import { blogPageRoute } from '../routes'
import postActions from '../action/posts'

const mapStateToProps = state => ({
  posts: state.posts.get('posts'),
  total: state.posts.get('total'),
  redirect: state.posts.get('redirectToHome'),
  error: state.posts.get('error'),
})

class PostFeed extends React.Component {
  constructor(props) {
    super(props)
    // console.log(`Props: ${JSON.stringify(props)}`)
    this.updatePosts = this.updatePosts.bind(this)
  }

  componentDidMount() {
    this.updatePosts(this.props.match.params.pageNum || 1)
  }

  componentWillReceiveProps(nextProps) {
    // console.log(`NextProps: ${JSON.stringify(nextProps)}`)
    // console.log(`this page: ${this.props.match.params.pageNum} next page: ${nextProps.match.params.pageNum}`)
    if (nextProps.match.params.pageNum !== this.props.match.params.pageNum) this.updatePosts(nextProps.match.params.pageNum || 1)
    else if (nextProps.redirect) {
      this.updatePosts(nextProps.match.params.pageNum || 1)
      this.props.dispatch(postActions.scrubRedirect())
    }
  }

  updatePosts (page) {
    this.props.dispatch(postActions.removeViewedPosts())

    // let page = this.props.match.params.pageNum || 1
    const correctedPage = page - 1
    // console.log(`PageNum: ${page} vs. ${this.props.match.params.pageNum}`)
    const postsToFetch = 5
    // console.log(`Displaying page ${correctedPage}`)
    this.props.dispatch(postActions.fetchPostsByRange(correctedPage * postsToFetch, (correctedPage * postsToFetch) + postsToFetch))
  }

  render () {
    // console.log(`Page num: ${this.props.match.params.pageNum}`)
    // console.log(`Page: ${page}`)
    // console.log(`Total: ${this.props.total} 5*page=${5*page}`)

    let page = Number(this.props.match.params.pageNum || 1)

    if (this.props.error) {
      return (
        <div className="alert alert-danger">{JSON.stringify(this.props.error)}</div>
      )
    }

    if (!this.props.posts || this.props.posts.size < 1) {
      return (
        <div>
          <h3>{`Loading page ${this.props.match.params.pageNum || 1}...`}</h3>
        </div>
      )
    }

    // if (this.props.posts.size < 1) {
    //   return (
    //     <div className="alert alert-info">No posts found!</div>
    //   )
    // }

    return (
      <div>
        {
          this.props.posts.map(post => {
            // console.log(JSON.stringify(post))
            return (
              <Post post={post} key={post.get('_id')} />
            )
          })
        }
        {page > 1
          ? <Link to={blogPageRoute(page - 1)} className="btn btn-secondary">&lt; Back</Link>
          : ''
        }
        {this.props.total > (5 * (page + 1))
          ? <Link to={blogPageRoute(page + 1)} className="btn btn-secondary float-right">Next &gt;</Link>
          : ''
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(PostFeed)
