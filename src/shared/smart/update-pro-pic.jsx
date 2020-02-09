// @flow

/**
 * This component handles the user updating their profile picture
 */

import React from 'react'

import {__user__} from '../default'

const onSubmit = (local, external) => {

}

const UpdateProPic = ({}: Props) => {
  let local
  let external

  return (
    <div className="border m-1 d-inline-block" style={{ 'vertical-align': 'top' }}>
      <div className="d-inline-block" style={{ 'vertical-align': 'top' }}>
        <label htmlFor="profile-picture">Update Profile Picture</label>
        <div><img className="img-thumbnail" src={__user__.propic} alt={'Your current profile image.'}
                  id="profile-picture" style={{height: '200px', width: '200px'}}/></div>
      </div>
      <div className="d-inline-block ml-1" style={{ verticalAlign: 'bottom' }} >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit(local, external)
          }}
        >
          <div className="form-group">
            <label
              htmlFor="local-pro-pic"
            >
              Upload Image from Device
            </label>
            <input
              id="local-pro-pic"
              className="form-control"
              type="file"
              name="local"
              accept="image/*"
              ref={(node) => {
                local = node
              }}
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="external-pro-pic"
            >
              Upload Image from URL
            </label>
            <input
              id="external-pro-pic"
              className="form-control"
              name="external"
              type="text"
              ref={(node) => {
                external = node
              }}
            />
          </div>
          <button
            className="btn btn-primary float-right"
            type="submit"
          >
            Update Photo
          </button>
        </form>
      </div>
    </div>

  )
}

export default UpdateProPic
