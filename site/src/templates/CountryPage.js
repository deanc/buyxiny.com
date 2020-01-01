import React from "react"
import SEO from "../components/SEO"
import ItemList from "../components/ItemList"
import PropTypes from "prop-types"
import { capitalize } from "lodash"
import Breadcrumb from "../components/Breadcrumb"

import ShareImage from "../assets/img/fbshare.png"

const CountryPage = ({ pageContext: { country, type } }) => {
  return (
    <>
      <SEO
        title={
          "Find products from your home countries when living in " +
          capitalize(country)
        }
        description={
          "Living in " +
          capitalize(country) +
          "? Find all your home products and where to buy them"
        }
        image={ShareImage}
      />
      <div className="container">
        <Breadcrumb
          country={country}
          crumbs={[
            {
              label: capitalize(country),
              linkTo: "/q/" + country,
            },
            {
              label: `Viewing items in ${country}`,
            },
          ]}
        />
      </div>
      <ItemList country={country} type={type} />
    </>
  )
}

CountryPage.propTypes = {
  pageContext: PropTypes.object,
}

export default CountryPage
