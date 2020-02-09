// @flow

import React from 'react'
import { connect } from 'react-redux'

import { __user__ } from '../default'

const mapStateToProps = state => ({
  loading: state.hello.get('loading'),
  bio: state.hello.get('bio'),
  propic: state.hello.get('propic'),
  error: state.hello.get('error'),
  name: state.hello.get('name'),
})

const Sidebar = ({loading, bio, propic, name, error}) => {
  if (error) {
    return (
      <div className="alert alert-danger">error</div>
    )
  }
  return (
    <div>
      <div>
        <img src={propic} alt={name} className="img-thumbnail" />
      </div>
      <div>
        <h2>
          {name}
        </h2>
      </div>
      <div>
        <p>
          {bio}
        </p>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(Sidebar)
