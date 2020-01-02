import React from "react"

import { Formik, Form, Field, ErrorMessage, useField } from "formik"

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
        if (!values.email) {
          errors.email = "Required"
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address"
        }
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
          <fieldset>
            <div className="form-row inline">
              <div className="label">
                Please choose whether this is a product or service you are
                adding:
              </div>
              <label>
                {/* name must match the Formik value key, and must
                be set on all radio buttons in the group  */}
                <Field type="radio" name="type" value="product" />
                Product
              </label>
              <label>
                <Field type="radio" name="type" value="service" />
                Service
              </label>
            </div>
          </fieldset>

          <fieldset>
            <h2>Item information</h2>

            <div className="form-row">
              <div className="info">
                <p>Some guidelines:</p>
                <ul>
                  <li>
                    Please enter a fairly descriptive name including the brand
                    (e.g. 'Typhoo tea' and not just 'Tea', or 'Cadbury Dairy
                    Milk' not just 'Dairy Milk')
                  </li>
                  <li>
                    If entering a service, be as descriptive as possible also
                    with the service name.
                  </li>
                </ul>
              </div>
              <TextInput
                name="item_name"
                label="Product/service name (required)"
                placeholder="Enter the name of the product/service"
              />
            </div>
          </fieldset>

          <fieldset>
            <h2>Where to buy it?</h2>

            <div className="info">
              <p>Some guidelines:</p>

              <ul>
                <li>
                  If you are entering the name of a chain, enter the city name
                  as part of the place name. For example don't enter "S-market"
                  as the place name but rather "S-market Hakaniemi"
                </li>
                <li>
                  For retail stores, please enter an address and website URL if
                  they have one. For online stores just enter the website URL.
                </li>
              </ul>
            </div>
            <div className="form-row">
              <TextInput name="place_name" label="Place name" />
            </div>
            <div className="form-row">
              <TextInput
                name="url"
                label="URL"
                placeholder="https://www.example.com"
              />
            </div>
            <div className="form-row">
              <TextInput
                name="address"
                label="Address (if possible)"
                placeholder="123 Street, City, Postcode"
              />
            </div>
          </fieldset>

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default AddItemForm
