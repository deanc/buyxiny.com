import React, { useState } from "react"

import { Formik, Form } from "formik"
import {
  Fieldset,
  FieldInfo,
  FormRow,
  FormLabel,
  TextInput,
  RadioGroup,
  Submit,
  FormError,
} from "./formik/fields"
import AddItemSchema from "./yup/schemas/AddItemSchema"
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

const AddItemForm = props => {
  const [locationAutocompleted, setLocationAutocompleted] = useState(false)

  return (
    <Formik
      initialValues={{
        type: "product",
        item_name: "",
        item_ref: null,
        place_name: "",
        place_ref: null,
        address: "",
        url: "",
      }}
      validationSchema={AddItemSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values)
        setTimeout(() => {
          // alert(JSON.stringify(values, null, 2))
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
            <ItemFieldInfo />
            <FormRow>
              <FormLabel label="Product/service name (required)" />
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
            </FormRow>
          </Fieldset>

          <Fieldset heading="Where to buy it?">
            <LocationFieldInfo />
            <FormRow>
              <FormLabel label="Place name (required)" />
              <AutocompleteField
                name="place_name"
                refFieldName="place_ref"
                setFieldValue={setFieldValue}
                onSuggestionSelected={suggestion => {
                  setFieldValue("place_name", suggestion.name)
                  setFieldValue("url", suggestion.url ? suggestion.url : "")
                  setFieldValue(
                    "address",
                    suggestion.address ? suggestion.address : ""
                  )
                  setFieldValue("place_ref", suggestion.objectID)
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
        </Form>
      )}
    </Formik>
  )
}

export default AddItemForm
