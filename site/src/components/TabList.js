import React from "react"
import PropTypes from "prop-types"
import Tab from "./Tab"

const TabList = ({ tabs }) => {
  return (
    <ul className="tab-list">
      {tabs.map((t, k) => (
        <Tab
          key={k}
          active={t.active}
          linkTo={t.linkTo}
          label={t.label}
          push={t.push}
        />
      ))}
    </ul>
  )
}

TabList.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object),
}

export default TabList
