import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import ItemList from "../components/ItemList"
import PropTypes from "prop-types"

const CountryPage = ({ pageContext: { slug } }) => {
  return (
    <Layout>
      <SEO title="Country List" />
      <ItemList country={slug} />
    </Layout>
  )
}

CountryPage.propTypes = {
  pageContext: PropTypes.object,
}

export default CountryPage
