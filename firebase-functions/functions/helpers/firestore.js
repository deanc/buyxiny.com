const slugify = require("slugify")

exports.addItem = async (db, object, locationRef) =>
  db.collection("items").add({
    ...object,
    locations: [db.doc("locations/" + locationRef)],
  })

exports.addLocation = async (db, object) =>
  db.collection("locations").add(object)

exports.addLocationToItem = async (db, itemRef, locationRef) =>
  db
    .collection("items")
    .doc(itemRef)
    .update({
      locations: admin.firestore.FieldValue.arrayUnion(
        db.doc("locations/" + locationRef)
      ),
    })

const docExists = async (db, collection, name) => {
  const snapshot = await db
    .collection(collection)
    .where("name", "==", name)
    .get()
  return !snapshot.empty
}
exports.docExists = docExists

exports.itemExists = async (db, name) => {
  return await docExists(db, "items", name)
}
exports.locationExists = async (db, name) => {
  return await docExists(db, "locations", name)
}

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
