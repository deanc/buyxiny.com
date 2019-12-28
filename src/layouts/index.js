import React from "react"
import PropTypes from "prop-types"
// import { useStaticQuery, graphql } from "gatsby"

import { ProvideAuth } from "../hooks/useAuth"

import Header from "../components/Header"
import "../assets/sass/app.scss"
import Footer from "../components/Footer"

const Layout = ({ children }) => {
  //   const data = useStaticQuery(graphql`
  //     query SiteTitleQuery {
  //       site {
  //         siteMetadata {
  //           title
  //         }
  //       }
  //     }
  //   `)

  return (
    <ProvideAuth>
      <Header /*siteTitle={data.site.siteMetadata.title}*/ />
      <main>{children}</main>
      <Footer />
    </ProvideAuth>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
