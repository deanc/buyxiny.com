import React, { useState, useRef } from "react"

// hooks
import { useAuth } from "../hooks/useAuth"
import useOnClickOutside from "use-onclickoutside"

// components
import Gravatar from "./Gravatar"
import NavigationProfileMenu from "./NavigationProfileMenu"

const NavigationProfile = user => {
  // add auth
  const auth = useAuth()

  // handle clicking outside menu collapse stuff
  const divRef = useRef()
  const buttonRef = useRef()
  const [menuActive, setMenuActive] = useState(false)
  useOnClickOutside(divRef, e => {
    if (!buttonRef.current.contains(e.target)) {
      setMenuActive(false)
    }
  })

  let userBlock = <span className="spinner"></span>
  if (auth && auth.initialized) {
    if (auth.user) {
      userBlock = (
        <>
          <button ref={buttonRef} onClick={() => setMenuActive(!menuActive)}>
            <Gravatar email={auth.user.email} size={32} active={menuActive} />
          </button>
          {/* A wrapping element is needed here as we cant ref a component */}
          <div ref={divRef}>
            <NavigationProfileMenu
              active={menuActive}
              user={auth.user}
              userClaims={auth.userClaims}
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
