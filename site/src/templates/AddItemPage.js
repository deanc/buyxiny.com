import React from "react"
import SEO from "../components/SEO"
import PropTypes from "prop-types"
import Breadcrumb from "../components/Breadcrumb"
import AddItemForm from "../components/forms/AddItemForm"
import { capitalize } from "lodash"
import querystring from "querystring"
import { useAuth } from "../hooks/useAuth"

import ShareImage from "../assets/img/fbshare.png"

const AddItemPage = ({
  pageContext: { id, slug, country, countryRef, name },
}) => {
  const auth = useAuth()

  const capitalizedCountry = capitalize(country)

  let form = (
    <p>Please sign in or create an account to add new products/services</p>
  )
  if (auth.initialized && auth.user) {
    form = (
      <AddItemForm
        authorRef={auth.user.uid}
        countrySlug={country}
        countryRef={countryRef}
      />
    )
    if (window.location.search.length) {
      const queryBits = querystring.parse(window.location.search.slice(1))
      if (queryBits.item) {
        form = (
          <AddItemForm
            itemRef={queryBits.item}
            authorRef={auth.user.uid}
            countrySlug={country}
            countryRef={countryRef}
          />
        )
      }
    }
  }

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
        {form}
      </div>
    </>
  )
}

AddItemPage.propTypes = {
  pageContext: PropTypes.object,
}

export default AddItemPage
