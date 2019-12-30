import React from "react"
import PropTypes from "prop-types"
import useItems from "../hooks/useItems"
import { BulletList } from "react-content-loader"
import ItemListItem from "./ItemListItem"
import ItemTypeList from "./ItemTypeList"

const ItemList = ({ country, type }) => {
  const { items, loading } = useItems(type)

  const filteredItems = items.filter(
    item => item.locations && item.locations.length
  )

  let itemsRender = <BulletList width={550} />
  if (!loading) {
    itemsRender =
      filteredItems &&
      filteredItems.map((item, i) => (
        <ItemListItem
          key={item.id}
          country={country}
          item={item}
          alt={i % 2 === 0}
        />
      ))
  }

  return (
    <div className="item-list">
      <div className="container">
        <ItemTypeList country={country} currentType={type} />
        {itemsRender}
      </div>
    </div>
  )
}

ItemList.propTypes = {
  country: PropTypes.string,
}

export default ItemList
