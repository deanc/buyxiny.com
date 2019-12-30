import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const Tab = ({ active, label, linkTo }) => {
  if (!linkTo || !linkTo.length) {
    return <li>{label}</li>
  }

  return (
    <li className={active ? "active" : ""}>
      <Link to={linkTo}>{label}</Link>
    </li>
  )
}

Tab.propTypes = {
  label: PropTypes.string.isRequired,
  linkTo: PropTypes.string,
  active: PropTypes.bool,
}

export default Tab
