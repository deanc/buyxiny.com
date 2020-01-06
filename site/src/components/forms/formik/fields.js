import React from "react"
import { Field, useField, ErrorMessage } from "formik"

export const Fieldset = ({ heading, children }) => {
  return (
    <fieldset>
      {heading && <h2>{heading}</h2>}
      {children}
    </fieldset>
  )
}

export const FormRow = ({ children }) => {
  return <div className="form-row">{children}</div>
}

export const FormLabel = ({ label }) => {
  return <div className="label">{label}</div>
}

export const FormError = ({ name }) => {
  return (
    <div className="error">
      <ErrorMessage name={name} />
    </div>
  )
}

export const FieldInfo = ({ children }) => {
  return (
    <FormRow>
      <div className="info">{children}</div>
    </FormRow>
  )
}

export const TextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props)
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input type="text" className="text-input" {...field} {...props} />
      <span className="after"></span>
      {meta.touched && meta.error ? <FormError name={props.name} /> : null}
    </>
  )
}

export const RadioGroup = ({ label, name, fields }) => {
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

export const Submit = ({ isSubmitting, label }) => {
  return (
    <button type="submit" disabled={isSubmitting}>
      {label}
    </button>
  )
}
