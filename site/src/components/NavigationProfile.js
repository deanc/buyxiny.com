import React, { useState, useRef } from "react"

// hooks
import { useAuth } from "../hooks/useAuth"
import { useOnClickOutside } from "../hooks/useOnClickOutside"

// components
import Gravatar from "./Gravatar"
import NavigationProfileMenu from "./NavigationProfileMenu"

const NavigationProfile = user => {
  const ref = useRef()
  const auth = useAuth()
  const [menuActive, setMenuActive] = useState(false)
  useOnClickOutside(ref, () => setMenuActive(false))

  let userBlock = <span className="spinner"></span>
  if (auth && auth.initialized) {
    if (auth.user) {
      userBlock = (
        <>
          <button onClick={() => setMenuActive(!menuActive)}>
            <Gravatar email={auth.user.email} size={32} active={menuActive} />
          </button>
          {/* A wrapping element is needed here as we cant ref a component */}
          <div ref={ref}>
            <NavigationProfileMenu
              active={menuActive}
              user={auth.user}
              onLogout={() => auth.signOut()}
            />
          </div>
        </>
      )
    } else {
      userBlock = (
        <button className="btn" onClick={() => auth.signInWithGoogle()}>
          Login / Create Account
        </button>
      )
    }
  }

  return <div className="nav-profile">{userBlock}</div>
}

export default NavigationProfile
