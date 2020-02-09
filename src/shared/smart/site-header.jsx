// @flow

/**
 * Jumbotron that displays the site title
 */

import React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import { APP_NAME } from '../config'

const mapStateToProps = state => ({
  title: state.hello.get('title'),
  name: state.hello.get('name'),
})

const SiteHeader = ({ title, name }) => (
  <div>
    <Helmet
      title={title}
      meta={[
        { name: 'description', content: title || APP_NAME },
        { property: 'og:title', content: title || `${name}'s ${APP_NAME}` },
      ]}
    />
    <div className="jumbotron">
      <h1 className="display-3">{title}</h1>
    </div>
  </div>
)

export default connect(mapStateToProps)(SiteHeader)
