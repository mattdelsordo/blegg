// @flow

/**
 * This component handles the user editing their bio
 */

import React from 'react'

const onSubmit = (textarea) => {

}

const BioEditor = ({}:Props) => {
  let textarea

  return (
    <div className="border border-light mt-3">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit(textarea)
        }}
      >
        <div className="mb-2" style={{ width: '100%' }}>
          <label htmlFor="textarea-bio">Edit Bio</label>
          <button className="btn btn-primary float-right">Update Bio</button>
        </div>
        <textarea
          id="textarea-bio"
          className="form-control"
          rows="5"
          ref={(node) => {
            textarea = node
          }}
        />
      </form>
    </div>

  )
}

export default BioEditor
