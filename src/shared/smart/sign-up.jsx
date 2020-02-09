// @flow

/**
 * This module handles the sign up UI for signing up
 */

import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

import { HOME_PAGE_ROUTE, LOGIN_PAGE_ROUTE } from '../routes'
import { APP_NAME } from '../config'
import auth from '../action/auth'
import { __egg__ } from '../default'

const title = 'Sign Up'
const description = 'Sign Up For A Blegg'

const mapStateToProps = state => ({
  alreadyIn: state.auth.get('loggedIn'),
  error: state.auth.get('error'),
})

const verifyPassword = (pass1, pass2) => {
  const pass = pass1.trim()
  if (pass.length > 2 && pass === pass2.trim()) return pass
  return null
}

const processName = (username) => {
  return username.trim()
}

const processEmail = (email) => {
  return email.trim()
}

const SignUp = ({ dispatch, alreadyIn, error }) => {
  let username
  let password1
  let password2
  let email

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

          const password = verifyPassword(password1.value, password2.value)
          if (password) {
            dispatch(auth.newUser(processName(username.value), processEmail(email.value), password))
          }
          else dispatch(auth.newUserFailure('Passwords do not match!'))
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
          type="email"
          placeholder="Email Address"
          required
          ref={(node) => {
            email = node
          }}
        />
        <input
          className="form-control m-1"
          type="password"
          placeholder="Password"
          required
          ref={(node) => {
            password1 = node
          }}
        />
        <input
          className="form-control m-1"
          type="password"
          placeholder="Retype Password"
          required
          ref={(node) => {
            password2 = node
          }}
        />
        <button
          className="btn btn-primary m-1"
          type="submit"
        >
          Sign Up!
        </button>
      </form>
      <Link to={LOGIN_PAGE_ROUTE} className="float-right">Already have an account?</Link>
    </div>
  )
}

export default connect(mapStateToProps)(SignUp)
