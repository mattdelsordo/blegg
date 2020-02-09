// @flow

import $ from 'jquery'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faCog from '@fortawesome/fontawesome-free-solid/faCog'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'
import faSignIn from '@fortawesome/fontawesome-free-solid/faSignInAlt'
import faSignOut from '@fortawesome/fontawesome-free-solid/faSignOutAlt'
import faUser from '@fortawesome/fontawesome-free-solid/faUser'
import { connect } from 'react-redux'

import { APP_NAME } from '../config'
import {
  HOME_PAGE_ROUTE,
  HELLO_PAGE_ROUTE,
  HELLO_ASYNC_PAGE_ROUTE,
  NOT_FOUND_DEMO_PAGE_ROUTE,
  NEW_POST_PAGE_ROUTE,
  SETTINGS_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
} from '../routes'
import authActions from '../action/auth'
import { __egg__ } from '../default'

// reference for font awesome
// https://github.com/FortAwesome/react-fontawesome

const handleNavLinkClick = () => {
  $('body').scrollTop(0)
  $('.js-navbar-collapse').collapse('hide')
}

const LogoutModal = ({ dispatch }) => (
  <div className="modal fade" id="logout-modal">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Log Out?</h5>
          <button type="button" className="close" data-dismiss="modal">×</button>
        </div>
        <div className="modal-body">
          Are you sure you would like to log out?
        </div>
        <div className="modal-footer">

          <form
            onSubmit={(e) => {
              e.preventDefault()
              $('#logout-modal').modal('hide')
              dispatch(authActions.logout())
            }}
          >
            <button
              id="logout-button"
              type="button"
              role="button"
              className="btn btn-secondary m-1"
              data-dismiss="modal"
            >Cancel
            </button>
            <button type="submit" role="button" className="btn btn-primary m-1">Sign Out</button>
          </form>

        </div>
      </div>
    </div>
  </div>
)

const LoggedInButtons = ({dispatch, name}) => (
  <ul className="navbar-nav ml-auto">
    <li className="nav-item" key={NEW_POST_PAGE_ROUTE}>
      <NavLink to={NEW_POST_PAGE_ROUTE} className="nav-link" activeStyle={{ color: 'white' }} exact onClick={handleNavLinkClick}>
          <span title="New Post">
            <FontAwesomeIcon icon={faPlus} /> New Post
          </span>
      </NavLink>
    </li>
    <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle" href="#" id="navbarUserDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <FontAwesomeIcon icon={faUser}/> {name}
      </a>
      <div className="dropdown-menu" aria-labelledby="navbarUserDropdown">
        {/*<NavLink to={SETTINGS_PAGE_ROUTE} className="dropdown-item" activeStyle={{ color: 'white' }} exact onClick={handleNavLinkClick}>*/}
          {/*<span title="Settings">*/}
            {/*<FontAwesomeIcon icon={faCog} /> Settings*/}
          {/*</span>*/}
        {/*</NavLink>*/}
        <a href="#" className="dropdown-item" type="button" role="button" data-toggle="modal" data-target="#logout-modal">
        <span title="Log Out">
          <FontAwesomeIcon icon={faSignOut} /> Log Out
        </span>
        </a>
      </div>
    </li>
  </ul>
)

const LoggedOutButtons = () => (
  <ul className="navbar-nav ml-auto">
    <li className="nav-item" key={LOGIN_PAGE_ROUTE}>
      <NavLink to={LOGIN_PAGE_ROUTE} className="nav-link" activeStyle={{ color: 'white' }} exact onClick={handleNavLinkClick}>
        <span title="Log In">
          <FontAwesomeIcon icon={faSignIn} /> Log In
        </span>
      </NavLink>
    </li>
  </ul>
)

const mapStateToProps = state => ({
  loggedIn: state.auth.get('loggedIn'),
  name: (state.auth.get('user') && state.auth.get('user').get('name')) ? state.auth.get('user').get('name') : 'ERROR: No user logged in!',
})

const Nav = ({ dispatch, loggedIn, name } : Props) => (
  <div>
    <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
      <button className="navbar-toggler navbar-toggler-right" type="button" role="button" data-toggle="collapse" data-target=".js-navbar-collapse">
        <span className="navbar-toggler-icon" />
      </button>
      <NavLink to={HOME_PAGE_ROUTE} className="navbar-brand">
        <img src={__egg__} alt="Blegg" className="mr-2" style={{height: '30px', width: '30px'}}/>
        {APP_NAME}
      </NavLink>
      <div className="js-navbar-collapse collapse navbar-collapse">
        { loggedIn ? <LoggedInButtons dispatch={dispatch} name={name} /> : <LoggedOutButtons /> }
      </div>
    </nav>
    <LogoutModal dispatch={dispatch} />
  </div>

)

export default connect(mapStateToProps)(Nav)
