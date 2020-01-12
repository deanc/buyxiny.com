import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import TabList from "./TabList"
import { uniq, capitalize } from "lodash"

const ItemTypeList = ({ country, currentType }) => {
  const data = useStaticQuery(graphql`
    query ItemTypeQuery {
      items: allItem {
        edges {
          node {
            type
          }
        }
      }
    }
  `)
  const types = uniq(data.items.edges.map(({ node }) => node.type))
  const remappedTypes = types.map(t => {
    // TODO: dont hardcode plurals :P
    return {
      label: capitalize(t) + "s",
      linkTo: `/q/${country}/${t}s`,
      active: currentType === t,
    }
  })
  const finalTypes = [
    {
      label: "All",
      linkTo: `/q/${country}`,
      active: currentType == null,
    },
    ...remappedTypes,
    {
      label: "+ Add<span class='hide-mobile'> item/service</span>",
      linkTo: `/q/${country}/add`,
      push: "right",
      active: true,
    },
  ]

  return <TabList tabs={finalTypes} />
}

ItemTypeList.propTypes = {
  country: PropTypes.string,
  currentType: PropTypes.string,
}

export default ItemTypeList
