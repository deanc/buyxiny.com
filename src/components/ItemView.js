import React from "react"
import PropTypes from "prop-types"

const ItemView = ({ slug }) => {
  return (
    <div className="item-view">
      <div className="container">{slug}</div>
    </div>
  )
}

ItemView.propTypes = {
  slug: PropTypes.string,
}

export default ItemView
