import React from "react";
import PropTypes from "prop-types";

// general
import classNames from "classnames";

import Gravatar from "./Gravatar";

const NavigationProfileMenu = ({ user, onLogout, active }) => {
  const menuClasses = classNames({
    "navigation-profile-menu": true,
    active: active
  });

  return (
    <div className={menuClasses}>
      <div className="user-info">
        <Gravatar email={user.email} size={80} />
        <p>
          <strong>{user.displayName}</strong>
          <br />
          {user.email}
        </p>
      </div>
      <p>
        <button className="btn" onClick={onLogout}>
          Logout
        </button>
      </p>
    </div>
  );
};

NavigationProfileMenu.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func,
  active: PropTypes.bool
};

export default NavigationProfileMenu;
