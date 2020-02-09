// @flow

/**
 * Form used to log in to the site
 * 1 - user inputs data
 * 2 - login button sends data to server
 * 3 - server validates data
 * 4 - if successful return login token ??
 * 5 - else return failure
 */

import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

import { __egg__ } from '../default'
import { APP_NAME } from '../config'
import auth from '../action/auth'
import { HOME_PAGE_ROUTE, SIGN_UP_PAGE_ROUTE } from '../routes'

const title = 'Log In'
const description = 'Log In to Blegg'

const proccessName = (username: string) => {
  return username.trim()
}

const processPass = (password: string) => {
  return password.trim()
}

const mapStateToProps = state => ({
  alreadyIn: state.auth.get('loggedIn'),
  error: state.auth.get('error'),
})

const LogIn = ({ dispatch, alreadyIn, error }) => {
  let username
  let password

  // console.log(`Logged in? ${alreadyIn}`)
  if (alreadyIn) {
    return (
      <Redirect to={HOME_PAGE_ROUTE} />
    )
  }

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', paddingBottom: '100px' }} className="p-2">
      <Helmet
        title={title}
        meta={[
          { name: 'description', content: description },
          { property: 'og:title', content: title },
        ]}
      />
      <Link to={HOME_PAGE_ROUTE}>
        <img src={__egg__} alt={`Log in to ${APP_NAME}`} className="img-fluid" style={{ width: '150px', padding: '10px' }} />
        <h2 style={{ display: 'inline', marginRight: '200px' }}>{APP_NAME}</h2>
      </Link>
      { error ? <div className="alert alert-danger">{JSON.stringify(error)}</div> : <div />}
      <form
        className="form-group"
        onSubmit={(e) => {
          e.preventDefault()
          
          dispatch(auth.login(proccessName(username.value), processPass(password.value)))
        }}
      >
        <input
          className="form-control m-1"
          type="text"
          placeholder="Username"
          required
          ref={(node) => {
            username = node
          }}
        />
        <input
          className="form-control m-1"
          type="password"
          placeholder="Password"
          required
          ref={(node) => {
            password = node
          }}
        />
        <button
          className="btn btn-primary m-1"
          type="Submit"
        >
          Sign In
        </button>
      </form>
      <Link to={SIGN_UP_PAGE_ROUTE} className="float-right">Need an account?</Link>
    </div>
  )
}

export default connect(mapStateToProps)(LogIn)
