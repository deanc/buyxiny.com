import React from "react"
import SEO from "../components/SEO"
import ItemList from "../components/ItemList"
import PropTypes from "prop-types"
import { capitalize } from "lodash"
import Breadcrumb from "../components/Breadcrumb"

const CountryPage = ({ pageContext: { country, type } }) => {
  return (
    <>
      <SEO title="Country List" />
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
