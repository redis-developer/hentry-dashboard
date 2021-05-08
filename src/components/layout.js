import * as React from "react"
import PropTypes from "prop-types"
import Link from "@material-ui/core/Link"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  return (
    <>
      <Header siteTitle="Hentry" />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 1160,
          minWidth: 200,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
