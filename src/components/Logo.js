import React from "react"
import logo from "../assets/img/logo.svg"
import { Link } from "gatsby"

// <div>Icons made by <a href="https://www.flaticon.com/authors/darius-dan" title="Darius Dan">Darius Dan</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

const Logo = props => {
  return (
    <Link className="logo" to="/">
      <img src={logo} alt="" />
      buy<span className="hl">x</span>in<span className="hl">y</span>
    </Link>
  )
}

export default Logo
