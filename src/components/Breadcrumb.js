import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const Breadcrumb = ({ crumbs }) => {
  return (
    <div className="breadcrumb">
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        {crumbs.map(crumb => {
          if (crumb.linkTo && crumb.linkTo.length) {
            return (
              <li>
                <Link to={crumb.linkTo}>{crumb.label}</Link>
              </li>
            )
          }
          return <li>{crumb.label}</li>
        })}
      </ul>
    </div>
  )
}

Breadcrumb.propTypes = {
  crumbs: PropTypes.arrayOf(PropTypes.object),
}

export default Breadcrumb
