import React from "react"
import NavigationProfile from "./NavigationProfile"
import Logo from "./Logo"
import NavigationSearch from "./NavigationSearch"

const Navigation = () => {
  return (
    <nav>
      <Logo />
      <NavigationSearch />
      <ul>
        <li>
          <NavigationProfile />
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
