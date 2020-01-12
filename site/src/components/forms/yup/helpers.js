import { without } from "lodash"

export const atLeastOneRequired = function(list, message) {
  // invariant(
  //   list.every(field => this.fields[field]),
  //   "All required fields should be defined before calling atLeastOneRequired"
  // )
  return this.shape(
    list.reduce(
      (acc, field) => ({
        ...acc,
        [field]: this.fields[field].when(without(list, field), {
          is: (...values) => !values.some(item => item),
          then: this.fields[field].required(message),
        }),
      }),
      {}
    ),
    list.reduce(
      (acc, item, idx, all) => [
        ...acc,
        ...all.slice(idx + 1).map(i => [item, i]),
      ],
      []
    )
  )
}
