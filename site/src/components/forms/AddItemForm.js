import React from "react"

import { Formik, Form, Field, useField } from "formik"
import ItemAutocomplete from "./ItemAutocomplete"

const Fieldset = ({ heading, children }) => {
  return (
    <fieldset>
      {heading && <h2>{heading}</h2>}
      {children}
    </fieldset>
  )
}

const FormRow = ({ children }) => {
  return <div className="form-row">{children}</div>
}

const FieldInfo = ({ children }) => {
  return (
    <FormRow>
      <div className="info">{children}</div>
    </FormRow>
  )
}

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

const TextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props)
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input type="text" className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
}

const RadioGroup = ({ label, name, fields }) => {
  return (
    <div className="form-row inline">
      <div className="label">
        {label}
        {/* Please choose whether this is a product or service you are adding: */}
      </div>
      {fields.map((f, i) => (
        <label key={i}>
          <Field type="radio" name={name} value={f.value} />
          {f.label}
        </label>
      ))}
    </div>
  )
}

const Submit = ({ isSubmitting, label }) => {
  return (
    <button type="submit" disabled={isSubmitting}>
      {label}
    </button>
  )
}

const AddItemForm = props => {
  return (
    <Formik
      initialValues={{
        type: "product",
        item_name: "",
        place_name: "",
        address: "",
        url: "",
      }}
      validate={values => {
        const errors = {}
        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values)
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }, 400)
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        isSubmitting,
        /* and other goodies */
      }) => (
        <Form>
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
              <ItemAutocomplete
                name="item_name"
                onSelectValue={setFieldValue}
                indexName="items"
                country={`finland`}
              />
            </FormRow>
          </Fieldset>

          <Fieldset heading="Where to buy it?">
            <LocationFieldInfo />
            <FormRow>
              <ItemAutocomplete
                name="place_name"
                onSelectValue={setFieldValue}
                indexName="locations"
                country={`finland`}
              />
            </FormRow>
            <FormRow>
              <TextInput
                name="url"
                label="URL"
                placeholder="https://www.example.com"
              />
            </FormRow>
            <FormRow>
              <TextInput
                name="address"
                label="Address (if possible)"
                placeholder="123 Street, City, Postcode"
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
