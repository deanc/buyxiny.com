import React from "react"
import SEO from "../components/SEO"
import PropTypes from "prop-types"
import ItemView from "../components/ItemView"
import Breadcrumb from "../components/Breadcrumb"
import { capitalize } from "lodash"

const ItemPage = ({ pageContext: { id, slug, country, name } }) => {
  return (
    <>
      <SEO title="Item view" />
      <div className="container">
        <Breadcrumb
          country={country}
          crumbs={[
            {
              label: capitalize(country),
              linkTo: "/q/" + country,
            },
            {
              label: name,
            },
          ]}
        />
      </div>
      <ItemView id={id} name={name} slug={slug} country={country} />
    </>
  )
}

ItemPage.propTypes = {
  pageContext: PropTypes.object,
}

export default ItemPage
