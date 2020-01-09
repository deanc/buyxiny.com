import React from "react"
import Navigation from "./Navigation"

const Header = props => {
  return (
    <header className="container">
      <Navigation {...props} />
    </header>
  )
}

export default Header
