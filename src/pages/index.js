import React from "react"

// import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Hero from "../components/Hero"

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <div className="container">
      <Hero />
    </div>
  </>
)

export default IndexPage
