import React from "react"

import { ProvideAuth } from "../hooks/useAuth"

import Header from "../components/Header"
import "../assets/sass/app.scss"
import Footer from "../components/Footer"

const Layout = ({ children, pageContext: { country } }) => {
  return (
    <ProvideAuth>
      <Header country={country} />
      <main>{children}</main>
      <Footer />
    </ProvideAuth>
  )
}

export default Layout
