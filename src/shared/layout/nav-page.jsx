// @flow

/**
 * Higher order component to display a page with a navbar
 */

import React from 'react'

import Nav from '../smart/nav'

const NavPage = (WrappedComponent) => (props) => (
  <div style={{ paddingTop: 54 }}>
    <Nav />
    <div className="pt-3 mb-5">
      <WrappedComponent {...props} />
    </div>
  </div>
)

export default NavPage
