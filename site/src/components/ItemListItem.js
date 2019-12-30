import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import classNames from "classnames"

const ItemListItem = ({ item, alt, country }) => {
  const itemClasses = classNames({
    "item-list-item": true,
    inverse: alt,
  })

  let locationCount = 0
  if (item.locations) {
    locationCount = item.locations.length
  }

  const url = `/q/where-to-buy-${item.slug}-in-${country}`

  return (
    <Link className={itemClasses} to={url}>
      <span className="title">{item.name}</span>
      <span className="location-count">{locationCount} locations</span>
    </Link>
  )
}

ItemListItem.propTypes = {
  items: PropTypes.object,
  alt: PropTypes.bool,
  country: PropTypes.string,
}

export default ItemListItem
