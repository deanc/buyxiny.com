import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Hero from "../components/Hero"
import CountryList from "../components/CountryList"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div className="container">
      <Hero />
      <CountryList />
    </div>
  </Layout>
)

export default IndexPage
