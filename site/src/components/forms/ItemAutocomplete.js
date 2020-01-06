import React, { Component } from "react"
import PropTypes from "prop-types"
import Autosuggest from "react-autosuggest"
import { InstantSearch, connectAutoComplete } from "react-instantsearch-dom"
import algoliasearch from "algoliasearch/lite"

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
)

const ItemAutoComplete = ({
  name,
  indexName,
  onSelectValue,
  onSuggestionSelected,
  onChange,
}) => (
  <InstantSearch searchClient={searchClient} indexName={indexName}>
    <AutoComplete
      name={name}
      onSelectValue={onSelectValue}
      onSuggestionSelected={onSuggestionSelected}
      onChange={onChange}
    />
    {/* <Configure hitsPerPage={1} /> */}
    {/* {/* <Index indexName="bestbuy" /> */}
    {/* <Index indexName="items" /> */}
  </InstantSearch>
)

class Example extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    hits: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentRefinement: PropTypes.string.isRequired,
    refine: PropTypes.func.isRequired,
    onSelectValue: PropTypes.func.isRequired,
    onSuggestionSelected: PropTypes.func.isRequired,
    onChange: PropTypes.func,
  }

  state = {
    value: this.props.currentRefinement,
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    })
    this.props.onSelectValue(this.props.name, newValue)
    console.log(newValue)
    this.props.onChange()
  }

  onSuggestionSelected = (event, { suggestion, method }) => {
    if (method === "enter") {
      event.preventDefault()
    }
    this.props.onSuggestionSelected(suggestion)
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.props.refine(value)
  }

  onSuggestionsClearRequested = () => {
    this.props.refine()
  }

  getSuggestionValue(hit) {
    return hit.name
  }

  renderSuggestion(hit) {
    return hit.name
  }

  render() {
    const { hits } = this.props
    const { value } = this.state

    const inputProps = {
      placeholder: "Enter name of product/service...",
      onChange: this.onChange,
      value,
    }

    return (
      <Autosuggest
        suggestions={hits}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    )
  }
}

const AutoComplete = connectAutoComplete(Example)

export default ItemAutoComplete
