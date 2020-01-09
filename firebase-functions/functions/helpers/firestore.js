const slugify = require("slugify")

exports.addItem = (db, object, locationRef) =>
  db.collection("items").add({
    ...object,
    locations: [db.doc("locations/" + locationRef)],
  })

exports.addLocation = (db, object) => db.collection("locations").add(object)

exports.createItemObject = formData => {
  return {
    name: formData.item_name,
    slug: slugify(formData.item_name),
    type: formData.type,
    author: formData.author_ref,
    active: true,
    created: new Date(),
    updated: new Date(),
    views: 0,
  }
}

exports.createLocationObject = (formData, countryRef) => {
  return {
    name: formData.location_name,
    url: formData.url && formData.url.length ? formData.url : "",
    address:
      formData.address && formData.address.length ? formData.address : "",
    created: new Date(),
    updated: new Date(),
    country: countryRef,
  }
}
