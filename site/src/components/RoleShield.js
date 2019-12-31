import React from "react"
import PropTypes from "prop-types"

import adminShield from "../assets/img/roles/admin.svg"
import moderatorShield from "../assets/img/roles/moderator.svg"

const RoleShield = ({ roles }) => {
  let shield = null
  if (roles.includes("admin")) {
    shield = adminShield
  } else if (roles.includes("moderator")) {
    shield = moderatorShield
  }
  return (
    <span className="role-shield">{shield && <img src={shield} alt="" />}</span>
  )
}

RoleShield.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string),
}

export default RoleShield
