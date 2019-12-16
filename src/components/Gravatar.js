import React from "react";
import PropTypes from "prop-types";
import crypto from "crypto";

import classNames from "classnames";

const Gravatar = ({ email, size, active }) => {
  const hash = crypto
    .createHash("md5")
    .update(email)
    .digest("hex");

  const gravatarClasses = classNames({
    gravatar: true,
    active: active
  });

  return (
    <img
      className={gravatarClasses}
      src={"https://www.gravatar.com/avatar/" + hash + "?s=" + size}
      alt=""
    />
  );
};

Gravatar.propTypes = {
  email: PropTypes.string,
  size: PropTypes.number,
  active: PropTypes.bool
};

export default Gravatar;
