// @flow

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import PostControls from './user-post-controls'
import { postPageRoute } from '../routes'
import { getImageURL } from '../config'

// const mapStateToProps = (state) => {
//   if (state.auth.get('user')) {
//     return {
//       currentUserId: state.auth.get('user').get('_id'),
//     }
//   }
// }

const Post = ({ post }) => {
  // console.log(`User id: ${currentUserId} Poster: ${post.get('poster')}`)

  return (
    <div className="card m-2 p-1">
      <Link to={postPageRoute(post.get('_id'))} className="card-body p-2">
        <h3 className="card-title">{post.get('title')}</h3>
        <h5 className="card-subtitle">by: {post.get('posterName')} on {post.get('date').slice(0,10)}</h5>
        {post.get('image')
          ? <img src={`${getImageURL(post.get('_id'))}#${new Date().getTime()}`} alt={post.get('title')} style={{maxHeight: '300px', maxWidth:'50%'}} className="m-1"/>
          : ''
        }
        <div className="card-text mt-3">
          <p>{`${post.get('content').slice(0, 140)}...`}</p>
        </div>
        {/*{currentUserId === post.get('poster') ? <PostControls post={post}/> : ''}*/}
      </Link>
    </div>
  )
}

export default connect()(Post)
