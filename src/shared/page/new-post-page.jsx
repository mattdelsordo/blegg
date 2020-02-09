// @flow

/**
 * This page contains a post editor component and allows the user to make a post
 */

import React from 'react'

import PostEditor from '../smart/post-edit'
import NavPage from '../layout/nav-page'

const NewPostPage = ({}:Props) => (
  <div className="container">
    <div className="row">
      <div className="col-12">
        <h1>New Post</h1>
        <PostEditor />
      </div>
    </div>
  </div>
)

export default NavPage(NewPostPage)
