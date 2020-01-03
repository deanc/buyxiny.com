const algoliasearch = require("algoliasearch")
const functions = require("firebase-functions")

const algoliaClient = algoliasearch(
  functions.config().algolia.appid,
  functions.config().algolia.apikey
)

const getIndex = index => algoliaClient.initIndex(index)

const saveDocumentInAlgolia = async (index, snapshot) => {
  if (snapshot.exists) {
    const record = snapshot.data()
    if (record) {
      // Removes the possibility of snapshot.data() being undefined.
      if (record.active) {
        const collectionIndex = getIndex(index)
        const res = await collectionIndex.saveObject(
          flatten(index, snapshot.id, record)
        ) // Adds or replaces a specific object.
        return res
      }
    }
  }
  return
}

const updateDocumentInAlgolia = async (index, change) => {
  const docBeforeChange = change.before.data()
  const docAfterChange = change.after.data()
  if (docBeforeChange && docAfterChange) {
    if (index === "items") {
      if (!docAfterChange.active && docBeforeChange.active) {
        // If the doc was active and is now not active, it was
        // previously indexed in algolia and must now be removed.
        const res = await deleteDocumentFromAlgolia(
          index,
          flattenItem(change.id, docAfterChange)
        )
        return res
      } else if (docAfterChange.active) {
        const res = await saveDocumentInAlgolia(
          index,
          flattenItem(change.id, docAfterChange)
        )
        return res
      }
    } else {
      const res = await saveDocumentInAlgolia(
        index,
        flatten(index, change.id, docAfterChange)
      )
      return res
    }
  }
  return
}

const deleteDocumentFromAlgolia = async (index, snapshot) => {
  if (snapshot.exists) {
    const objectID = snapshot.id
    const collectionIndex = getIndex(index)
    const res = await collectionIndex.deleteObject(objectID)
    return res
  }
  return
}

const flattenItem = (id, snapshot) => {
  return {
    objectID: id,
    name: snapshot.name,
    slug: snapshot.slug,
    type: snapshot.type,
  }
}

const flattenLocation = (id, snapshot) => {
  return {
    objectID: id,
    name: snapshot.name,
    address: snapshot.address,
    url: snapshot.url,
    country: snapshot.country,
  }
}

const flatten = (index, id, snapshot) => {
  switch (index) {
    case "items":
      return flattenItem(id, snapshot)
    case "locations":
      return flattenLocation(id, snapshot)
    default:
      return snapshot
  }
}

module.exports = {
  getIndex: getIndex,
  saveDocumentInAlgolia: saveDocumentInAlgolia,
  deleteDocumentFromAlgolia: deleteDocumentFromAlgolia,
  updateDocumentInAlgolia: updateDocumentInAlgolia,
  flattenItem: flattenItem,
  flattenLocation: flattenLocation,
}
