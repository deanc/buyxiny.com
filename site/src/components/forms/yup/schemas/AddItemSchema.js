import * as Yup from "yup"
import { atLeastOneRequired } from "../helpers"
Yup.addMethod(Yup.object, "atLeastOneRequired", atLeastOneRequired)

const shapedObject = {
  type: Yup.string()
    .ensure()
    .lowercase()
    .oneOf(["product", "service"])
    .required("This field is required"),
  item_name: Yup.string()
    .ensure()
    .min(3, "Item name must be at least 3 characters")
    .max(50, "Let's not make item names more long than 50 chars")
    .required("Required"),
  location_name: Yup.string()
    .ensure()
    .min(3, "Place name must be at least 3 characters")
    .required("Required"),
  location_ref: Yup.string().nullable(),
  // .test(
  //   "avoid-dupe",
  //   "You can't add a location which exists to an item which already exists.",
  //   function(val) {
  //     const item = this.resolve(Yup.ref("item_ref"))
  //     if (val && item && val.length && item.length) {
  //       return false
  //     }
  //     return true
  //   }
  // ),
  url: Yup.string()
    .ensure()
    .url("Please enter a valid URL"),
  // .required("Required"),
  address: Yup.string().ensure(),
  author_ref: Yup.string().required("Required"),
  country_ref: Yup.string().required("Required"),
  // .required("Required"),
}

export const AddItemSchema = Yup.object(shapedObject)
  .shape()
  .atLeastOneRequired(
    ["url", "address"],
    "Please enter at least one of these, preferably both."
  )

const reshapedObject = { ...shapedObject }
delete reshapedObject.item_name

export const AddLocationSchema = Yup.object(reshapedObject)
  .shape()
  .atLeastOneRequired(
    ["url", "address"],
    "Please enter at least one of these, preferably both."
  )
