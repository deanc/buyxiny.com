import * as Yup from "yup"
import { atLeastOneRequired } from "../helpers"
Yup.addMethod(Yup.object, "atLeastOneRequired", atLeastOneRequired)

const AddItemSchema = Yup.object()
  .shape({
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
    place_name: Yup.string()
      .ensure()
      .min(3, "Place name must be at least 3 characters")
      .required("Required"),
    place_ref: Yup.string()
      .nullable()
      .test(
        "avoid-dupe",
        "You can't add a location which exists to an item which already exists.",
        function(val) {
          const item = this.resolve(Yup.ref("item_ref"))
          console.log(item)
          if (val && item && val.length && item.length) {
            return false
          }
          return true
        }
      ),
    url: Yup.string()
      .ensure()
      .url("Please enter a valid URL"),
    // .required("Required"),
    address: Yup.string().ensure(),
    // .required("Required"),
  })
  .atLeastOneRequired(
    ["url", "address"],
    "Please enter at least one of these, preferably both."
  )

export default AddItemSchema
