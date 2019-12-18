import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import useCountries from "../hooks/useCountries"

const CountryList = () => {
  const { countries } = useCountries()

  return (
    <div className="country-list" id="countries">
      <div className="container">
        <h2>Countries</h2>
        {countries &&
          countries.map(country => (
            <div key={country.id} className="country">
              <Link className="btn name" to={"/q/" + country.slug}>
                {country.name}
              </Link>
            </div>
          ))}
      </div>
    </div>
  )
}

CountryList.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object),
}

export default CountryList
