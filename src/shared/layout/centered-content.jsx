// @flow

/**
 * Higher order component to center some other component
 */

import React from 'react'

const CenteredContent = (WrappedComponent) => (props) => (
  <table style={{ height: '100vh', width: '100vw' }}>
    <tbody>
      <tr>
        <td className="align-middle">
          <div style={{ margin: 'auto' }}>
            <WrappedComponent {...props} />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
)

export default CenteredContent
