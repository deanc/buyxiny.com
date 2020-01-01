import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import classNames from "classnames"

const Tab = ({ active, label, linkTo, push }) => {
  if (!linkTo || !linkTo.length) {
    return <li>{label}</li>
  }

  const tabClasses = classNames({
    active,
    [`push-${push}`]: push && push.length,
  })

  return (
    <li className={tabClasses}>
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
