import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import algoliasearch from "algoliasearch/lite"
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
} from "react-instantsearch-dom"
import "instantsearch.css/themes/algolia.css"

const algoliaClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
)

const searchClient = {
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          processingTimeMS: 0,
        })),
      })
    }

    return algoliaClient.search(requests)
  },
}

const SearchResult = ({ hit, searchState, setSearchState, country }) => {
  return (
    <div>
      <Link
        onClick={() => {
          setSearchState({
            ...searchState,
            query: "",
          })
        }}
        to={`/q/where-to-buy-${hit.slug}-in-${country}`}
      >
        <Highlight attribute="name" hit={hit} />
      </Link>
    </div>
  )
}

const NavigationSearch = ({ country, showSearch }) => {
  const [searchState, setSearchState] = useState({})
  const Hit = React.useRef(props => (
    <>
      <SearchResult
        {...props}
        searchState={searchState}
        setSearchState={setSearchState}
        country={country}
      />
    </>
  ))

  if (!country || !country.length || showSearch === false) {
    return <></>
  }

  return (
    <div className="navigation-search">
      <InstantSearch
        searchState={searchState}
        onSearchStateChange={setSearchState}
        indexName="items"
        searchClient={searchClient}
      >
        <SearchBox />
        <Hits hitComponent={Hit.current} />
      </InstantSearch>
    </div>
  )
}

NavigationSearch.propTypes = {
  country: PropTypes.string,
}

export default NavigationSearch
