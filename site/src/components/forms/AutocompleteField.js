import React, { Component } from "react"
import PropTypes from "prop-types"
import { FormError } from "../forms/formik/fields"

import Autosuggest from "react-autosuggest"
import { InstantSearch, connectAutoComplete } from "react-instantsearch-dom"
import algoliasearch from "algoliasearch/lite"
import classNames from "classnames"

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
)

const AutocompleteField = ({
  name,
  refFieldName,
  indexName,
  setFieldValue,
  onSuggestionSelected,
  onChange,
  autoCompletedLabel,
}) => (
  <InstantSearch searchClient={searchClient} indexName={indexName}>
    <AutoComplete
      name={name}
      refFieldName={refFieldName}
      setFieldValue={setFieldValue}
      onSuggestionSelected={onSuggestionSelected}
      onChange={onChange}
      autoCompletedLabel={autoCompletedLabel}
    />
    {/* <Configure hitsPerPage={1} /> */}
    {/* {/* <Index indexName="bestbuy" /> */}
    {/* <Index indexName="items" /> */}
  </InstantSearch>
)

class Example extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    refFieldName: PropTypes.string,
    hits: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentRefinement: PropTypes.string.isRequired,
    refine: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    onSuggestionSelected: PropTypes.func.isRequired,
    onChange: PropTypes.func,
  }

  state = {
    value: this.props.currentRefinement,
    autoCompleted: false,
  }

  onChange = (event, { newValue }) => {
    const { setFieldValue, name, refFieldName, onChange } = this.props

    this.setState({
      value: newValue,
      autoCompleted: false,
    })
    setFieldValue(name, newValue)
    if (refFieldName && refFieldName.length) {
      setFieldValue(refFieldName, null)
    }
    onChange()
  }

  onSuggestionSelected = (event, { suggestion, method }) => {
    if (method === "enter") {
      event.preventDefault()
    }
    this.setState({
      autoCompleted: true,
    })
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
    const { hits, autoCompletedLabel, name, refFieldName } = this.props
    const { value } = this.state

    const inputProps = {
      placeholder: "Enter name of product/service...",
      onChange: this.onChange,
      value,
      className: this.state.autoCompleted ? "autocompleted" : "",
    }

    const containerClasses = classNames({
      "autosuggest-container": true,
      autocompleted: this.state.autoCompleted,
    })

    const renderInputComponent = inputProps => (
      <div className="input-holder">
        <input {...inputProps} />
        <span className="after"></span>
      </div>
    )

    return (
      <div className={containerClasses}>
        <Autosuggest
          suggestions={hits}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          renderInputComponent={renderInputComponent}
          inputProps={inputProps}
        />
        <span className="autocomplete-label">
          {this.state.autoCompleted ? autoCompletedLabel : ""}
        </span>
        <FormError name={name} />
        {refFieldName && <FormError name={refFieldName} />}
      </div>
    )
  }
}

const AutoComplete = connectAutoComplete(Example)

export default AutocompleteField
