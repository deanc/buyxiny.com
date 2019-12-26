import React from "react"
import PropTypes from "prop-types"
import md5 from "md5"

import classNames from "classnames"

const Gravatar = ({ email, size, active }) => {
  const hash = md5(email)

  const gravatarClasses = classNames({
    gravatar: true,
    active: active,
  })

  return (
    <img
      className={gravatarClasses}
      src={"https://www.gravatar.com/avatar/" + hash + "?s=" + size}
      alt=""
    />
  )
}

Gravatar.propTypes = {
  email: PropTypes.string,
  size: PropTypes.number,
  active: PropTypes.bool,
}

export default Gravatar
