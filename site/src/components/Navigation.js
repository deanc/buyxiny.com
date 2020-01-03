import React from "react"
import NavigationProfile from "./NavigationProfile"
import Logo from "./Logo"
import NavigationSearch from "./NavigationSearch"

const Navigation = ({ country }) => {
  return (
    <nav>
      <Logo />
      <NavigationSearch country={country} />
      <ul>
        <li>
          <NavigationProfile />
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
