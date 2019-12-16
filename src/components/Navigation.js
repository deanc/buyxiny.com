import React from "react";
import NavigationProfile from "./NavigationProfile";
import Logo from "./Logo";

const Navigation = () => {
  return (
    <nav>
      <Logo />
      <ul>
        <li>
          <NavigationProfile />
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
