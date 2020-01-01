import React from "react"
import SEO from "../components/SEO"
import PropTypes from "prop-types"
import ItemView from "../components/ItemView"
import Breadcrumb from "../components/Breadcrumb"
import AddItemForm from "../components/forms/AddItemForm"
import { capitalize } from "lodash"

import ShareImage from "../assets/img/fbshare.png"

const AddItemPage = ({ pageContext: { id, slug, country, name } }) => {
  const capitalizedCountry = capitalize(country)

  return (
    <>
      <SEO
        title={`Where to buy ${name} in ${capitalizedCountry}`}
        description={`Can't find ${name} in ${capitalizedCountry}? Visit our site to find out where to easily buy it!`}
        image={ShareImage}
      />
      <div className="container">
        <Breadcrumb
          country={country}
          crumbs={[
            {
              label: capitalizedCountry,
              linkTo: "/q/" + country,
            },
            {
              label: "Add new product/service",
            },
          ]}
        />
        <AddItemForm />
      </div>
    </>
  )
}

AddItemPage.propTypes = {
  pageContext: PropTypes.object,
}

export default AddItemPage
