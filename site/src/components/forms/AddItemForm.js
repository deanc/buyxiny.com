import React, { useState } from "react"
import { Link } from "gatsby"
import axios from "axios"
import useItem from "../../hooks/useItem"

import { Formik, Form } from "formik"
import {
  Fieldset,
  FieldInfo,
  FormRow,
  FormLabel,
  TextInput,
  RadioGroup,
  Submit,
} from "./formik/fields"
import { AddItemSchema, AddLocationSchema } from "./yup/schemas/AddItemSchema"
import AutocompleteField from "./AutocompleteField"

const ItemFieldInfo = () => {
  return (
    <FieldInfo>
      <p>Some guidelines:</p>
      <ul>
        <li>
          Please enter a fairly descriptive name including the brand (e.g.
          'Typhoo tea' and not just 'Tea', or 'Cadbury Dairy Milk' not just
          'Dairy Milk')
        </li>
        <li>
          If entering a service, be as descriptive as possible also with the
          service name.
        </li>
      </ul>
    </FieldInfo>
  )
}

const LocationFieldInfo = () => {
  return (
    <FieldInfo>
      <p>Some guidelines:</p>

      <ul>
        <li>
          If you are entering the name of a chain, enter the city name as part
          of the place name. For example don't enter "S-market" as the place
          name but rather "S-market Hakaniemi"
        </li>
        <li>
          For retail stores, please enter an address and website URL if they
          have one. For online stores just enter the website URL.
        </li>
      </ul>
    </FieldInfo>
  )
}

const AddItemForm = ({ countrySlug, countryRef, authorRef, itemRef }) => {
  const [locationAutocompleted, setLocationAutocompleted] = useState(false)
  const [success, setSuccess] = useState(false)
  const [globalError, setGlobalError] = useState(null)
  const { item } = useItem(itemRef)

  const schema = !itemRef ? AddItemSchema : AddLocationSchema

  if (success) {
    return (
      <>
        <p>
          Thank you. Your submission will appear on the site within 15-30mins.
        </p>
        <p>
          <Link className="btn btn-small" to={`/q/${countrySlug}`}>
            Go back to browsing
          </Link>
        </p>
      </>
    )
  }

  return (
    <Formik
      initialValues={{
        type: "product",
        item_name: "",
        item_ref: itemRef,
        location_name: "",
        location_ref: null,
        address: "",
        url: "",
        author_ref: authorRef,
        country_ref: countryRef,
      }}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          const APIURL = process.env.GATSBY_FIREBASE_FUNCTIONS_API_BASE

          let route = "addLocationToItem"
          if (!values.item_ref || !values.item_ref.length) {
            route = "addItem"
          }

          // const formData = new FormData()
          // Object.keys(values).forEach(key => formData.append(key, values[key]))

          setGlobalError(null)
          axios
            .post(APIURL + "/" + route, values)
            .then(function(response) {
              if (response.status === 200) {
                setSuccess(true)
              } else {
                setGlobalError(response.error)
              }
            })
            .catch(function(response) {
              //handle error
              setGlobalError("Something went horribly wrong!")
            })

          setSubmitting(false)
        }, 400)
      }}
    >
      {({ setFieldValue, isSubmitting, errors }) => (
        <Form>
          {/* {errors && console.log(errors)} */}
          <Fieldset>
            <RadioGroup
              name="type"
              label={
                "Please choose whether this is a product or service you are adding:"
              }
              fields={[
                { label: "Product", value: "product" },
                { label: "Service", value: "service" },
              ]}
            />
          </Fieldset>

          <Fieldset heading="Item information">
            {!item && <ItemFieldInfo />}
            <FormRow>
              {!item && <FormLabel label="Product/service name (required)" />}
              {!item && (
                <AutocompleteField
                  name="item_name"
                  refFieldName="item_ref"
                  setFieldValue={setFieldValue}
                  onChange={() => {}}
                  onSuggestionSelected={suggestion => {
                    setFieldValue("item_name", suggestion.name)
                    setFieldValue("item_ref", suggestion.objectID)
                  }}
                  indexName="items"
                  country={`finland`}
                  autoCompletedLabel="Awesome! We already have this item in our database. Please continue to add a location."
                />
              )}
              {item && <h3>{item.name}</h3>}
            </FormRow>
          </Fieldset>

          <Fieldset heading="Where to buy it?">
            <LocationFieldInfo />
            <FormRow>
              <FormLabel label="Place name (required)" />
              <AutocompleteField
                name="location_name"
                refFieldName="location_ref"
                setFieldValue={setFieldValue}
                onSuggestionSelected={suggestion => {
                  setFieldValue("location_name", suggestion.name)
                  setFieldValue("url", suggestion.url ? suggestion.url : "")
                  setFieldValue(
                    "address",
                    suggestion.address ? suggestion.address : ""
                  )
                  setFieldValue("location_ref", suggestion.objectID)
                  setLocationAutocompleted(true)
                }}
                onChange={() => {
                  setLocationAutocompleted(false)
                  setFieldValue("url", "")
                  setFieldValue("address", "")
                }}
                indexName="locations"
                country={`finland`}
              />
            </FormRow>
            <FormRow>
              <TextInput
                name="url"
                label="URL"
                placeholder="https://www.example.com"
                disabled={locationAutocompleted}
                data-autocompleted={locationAutocompleted}
              />
            </FormRow>
            <FormRow>
              <TextInput
                name="address"
                label="Address (if possible)"
                placeholder="123 Street, City, Postcode"
                disabled={locationAutocompleted}
                data-autocompleted={locationAutocompleted}
              />
            </FormRow>
          </Fieldset>

          <Submit label="Submit" disabled={isSubmitting} />
          {globalError && <p>{globalError}</p>}
        </Form>
      )}
    </Formik>
  )
}

export default AddItemForm
