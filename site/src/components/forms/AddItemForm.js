import React from "react"
import PropTypes from "prop-types"

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
      initialValues={{ type: "product" }}
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
          <div className="form-row">
            <TextInput name="name" label="Name" />
          </div>
          <div className="form-row inline">
            Type
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
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

AddItemForm.propTypes = {}

export default AddItemForm
