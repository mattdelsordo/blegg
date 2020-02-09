// @flow

import React from 'react'

const callUsernameModal = () => {
  alert('This is where one would update their username.')
}

const callPasswordModal = () => {
  alert('This is where one would update their password.')
}

const callEmailModal = () => {
  alert('This is where one would update their email.')
}

const IdUpdate = ({}: Props) => (
  <div className="border m-1 d-inline-block" style={{ 'vertical-align': 'center'}}>
    <div>
      <button className="btn btn-primary m-1" onClick={callUsernameModal} style={{ width: '100%' }}>
        Change Username
      </button>
    </div>
    <div>
      <button className="btn btn-primary m-1" onClick={callPasswordModal} style={{ width: '100%' }}>
        Change Password
      </button>
    </div>
    <div>
      <button className="btn btn-primary m-1" onClick={callEmailModal} style={{ width: '100%' }}>
        Update Email
      </button>
    </div>

  </div>
)

export default IdUpdate
