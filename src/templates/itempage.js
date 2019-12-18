import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import PropTypes from "prop-types"
import ItemView from "../components/ItemView"

const ItemPage = ({ pageContext: { slug } }) => {
  return (
    <Layout>
      <SEO title="Item view" />
      <ItemView slug={slug} />
    </Layout>
  )
}

ItemPage.propTypes = {
  pageContext: PropTypes.object,
}

export default ItemPage
