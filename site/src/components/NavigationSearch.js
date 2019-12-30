import React from "react"
import PropTypes from "prop-types"

const NavigationSearch = ({ country }) => {
  if (!country || !country.length) {
    return <></>
  }

  return (
    <div className="navigation-search">
      <input
        type="text"
        name="search"
        value=""
        placeholder={`Search for products or service in ${country}`}
      />
    </div>
  )
}

NavigationSearch.propTypes = {
  country: PropTypes.string,
}

export default NavigationSearch
