// @flow

import React from 'react'
import Helmet from 'react-helmet'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import NavPage from '../layout/nav-page'
import PostFeed from '../smart/post-feed'
import Sidebar from '../smart/sidebar'
import NewPost from '../smart/post-edit'
import SiteHeader from '../smart/site-header'
import SinglePost from '../smart/single-post-display'

import { __user__ } from '../default'
import { blogPageRoute, postPageRoute, HOME_PAGE_ROUTE, NEW_POST_PAGE_ROUTE } from '../routes'

const Blog = ({ title, name }) => {
  return (
    <div className="container">
      <SiteHeader />
      <div className="container">
        <div className="row">
          <div className="col-8">
            <Route exact path={blogPageRoute()} component={PostFeed} />
            <Route exact path={HOME_PAGE_ROUTE} component={PostFeed} />
            <Route exact path={postPageRoute()} component={SinglePost} />
            <Route exact path={NEW_POST_PAGE_ROUTE} render={() => <NewPost />} />
          </div>
          <div className="col-4">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavPage(Blog)
