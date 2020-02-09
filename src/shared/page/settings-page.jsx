// @flow

/**
 * This page handles modification of user settings
 */

import React from 'react'

import NavPage from '../layout/nav-page'
import UpdateProPic from '../smart/update-pro-pic'
import IdUpdate from '../dumb/user-id-update'
import BioEditor from '../smart/bio-editor'

const SettingsPage = ({}:Props) => (
  <div className="container">
    <div className="row">
      <div className="col-12">
        <h1>Settings</h1>
        <div>
          <UpdateProPic />
          <IdUpdate />
        </div>
        <BioEditor />
      </div>
    </div>
  </div>
)

export default NavPage(SettingsPage)
