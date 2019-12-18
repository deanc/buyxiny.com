import React from "react"
import PropTypes from "prop-types"
import useItems from "../hooks/useItems"
import { BulletList } from "react-content-loader"
import ItemListItem from "./ItemListItem"

const ItemList = ({ country }) => {
  const { items, loading } = useItems()
  let loadingRender = null
  if (loading) {
    loadingRender = <BulletList width={550} />
  }

  const itemsRender =
    items &&
    items.map((item, i) => (
      <ItemListItem
        key={item.id}
        country={country}
        item={item}
        alt={i % 2 === 0}
      />
    ))

  return (
    <div className="item-list">
      <div className="container">
        <h2>Items</h2>
        {loadingRender}
        {itemsRender}
      </div>
    </div>
  )
}

ItemList.propTypes = {
  country: PropTypes.string,
}

export default ItemList
