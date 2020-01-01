import React from "react"
import PropTypes from "prop-types"
import useItem from "../hooks/useItem"
import { Facebook as FacebookLoader } from "react-content-loader"
import ItemLocation from "./ItemLocation"
import { capitalize } from "lodash"
import Comments from "./Comments"

const ItemView = ({ id, name, slug, country }) => {
  const { item, loading } = useItem(id)

  let loadingContent
  if (loading) {
    loadingContent = <FacebookLoader width={500} />
  }

  let locations = []
  if (item.locations) {
    item.locations.forEach((location, i) => {
      locations.push(
        <ItemLocation
          key={i}
          name={location.name}
          url={location.url}
          address={location.address}
        />
      )
    })
  }

  return (
    <div className="item-view">
      <div className="container">
        <h1>
          Where to buy <span className="hl">{name}</span> in{" "}
          <span className="hl">{capitalize(country)}</span>
        </h1>
        {loadingContent}
        <div className="locations">{locations}</div>
        <h2>Discussion</h2>
        <Comments identifier={`item-${id}-country-${country}`} />
      </div>
    </div>
  )
}

ItemView.propTypes = {
  name: PropTypes.string,
  slug: PropTypes.string,
  country: PropTypes.string,
}

export default ItemView
