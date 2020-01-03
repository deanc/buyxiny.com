import React from "react"
import Navigation from "./Navigation"

const Header = ({ country }) => {
  return (
    <header className="container">
      <Navigation country={country} />
    </header>
  )
}

export default Header
