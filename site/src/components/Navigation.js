import React from "react"
import NavigationProfile from "./NavigationProfile"
import Logo from "./Logo"
import NavigationSearch from "./NavigationSearch"

const Navigation = props => {
  return (
    <nav>
      <Logo />
      <NavigationSearch {...props} />
      <ul>
        <li>
          <NavigationProfile />
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
