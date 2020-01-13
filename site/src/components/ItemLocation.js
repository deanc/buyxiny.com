import React from "react"
import PropTypes from "prop-types"
import { useAuth } from "../hooks/useAuth"

const ItemLocation = ({ name, locationRef, address, url, closed }) => {
  const auth = useAuth()

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

  let ref = null
  const isAdmin =
    auth.user &&
    auth.userClaims &&
    auth.userClaims.roles &&
    auth.userClaims.roles.includes("admin")
  if (isAdmin) {
    ref = <span>{locationRef}</span>
  }

  let closedRender = null
  if (closed) {
    closedRender = (
      <p>
        <span className="btn danger">Permanently closed </span>
      </p>
    )
  }

  return (
    <div className="item-location">
      <h3>
        {name} {ref} {url ? urlRender : ""}
      </h3>

      <p>{address}</p>
      {closedRender}
    </div>
  )
}

ItemLocation.propTypes = {
  name: PropTypes.string,
  address: PropTypes.string,
  url: PropTypes.string,
}

export default ItemLocation
