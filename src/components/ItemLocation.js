import React from "react"
import PropTypes from "prop-types"

const ItemLocation = ({ name, address, url }) => {
  let urlRender
  if (url && url.length) {
    urlRender = (
      <>
        <span>(</span>
        <a target="_blank" href={url} rel="noreferrer noopener">
          {url}
        </a>
        <span>)</span>
      </>
    )
  }

  return (
    <div className="item-location">
      <h3>
        {name} {url ? urlRender : ""}
      </h3>
      <p>{address}</p>
    </div>
  )
}

ItemLocation.propTypes = {
  name: PropTypes.string,
  address: PropTypes.string,
  url: PropTypes.string,
}

export default ItemLocation
