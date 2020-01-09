import React from "react"

import { ProvideAuth } from "../hooks/useAuth"

import Header from "../components/Header"
import "../assets/sass/app.scss"
import Footer from "../components/Footer"

const Layout = ({ children, pageContext: { country, showSearch } }) => {
  return (
    <ProvideAuth>
      <Header country={country} showSearch={showSearch} />
      <main>{children}</main>
      <Footer />
    </ProvideAuth>
  )
}

export default Layout
