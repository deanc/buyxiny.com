// functions helpers
const functions = require("firebase-functions")

// set up firebase admin
const admin = require("firebase-admin")
admin.initializeApp()
const db = admin.firestore()

// helpers
const algoliaHelpers = require("./helpers/algolia")
const netlifyHelpers = require("./helpers/netlify")

// config
const collectionsToMonitor = ["items", "locations"]

exports.collectionOnCreate = functions.firestore
  .document("{collection}/{id}")
  .onCreate(async (snapshot, context) => {
    if (!collectionsToMonitor.includes(context.params.collection)) {
      return
    }

    const promises = []
    promises.push(
      netlifyHelpers.pingNetlify(functions.config().netlify.buildhook)
    )
    promises.push(algoliaHelpers.saveDocumentInAlgolia("items", snapshot))
    return Promise.all(promises)
  })

exports.collectionOnUpdate = functions.firestore
  .document("{collection}/{id}")
  .onUpdate(async (change, context) => {
    if (!collectionsToMonitor.includes(context.params.collection)) {
      return
    }

    const promises = []
    promises.push(
      netlifyHelpers.pingNetlify(functions.config().netlify.buildhook)
    )
    promises.push(algoliaHelpers.updateDocumentInAlgolia("items", change))
    return Promise.all(promises)
  })

exports.collectionOnDelete = functions.firestore
  .document("{collection}/{id}")
  .onDelete(async (snapshot, context) => {
    if (!collectionsToMonitor.includes(context.params.collection)) {
      return
    }

    const promises = []
    promises.push(
      netlifyHelpers.pingNetlify(functions.config().netlify.buildhook)
    )
    promises.push(algoliaHelpers.deleteDocumentFromAlgolia("items", snapshot))
    return Promise.all(promises)
  })

exports.sendCollectionToAlgolia = functions.https.onRequest(
  async (req, res) => {
    const itemRecords = [],
      locationRecords = []

    const itemsQuerySnapshot = await db.collection("items").get()
    itemsQuerySnapshot.docs.forEach(doc => {
      const document = doc.data()
      const record = algoliaHelpers.flattenItem(doc.id, document)
      itemRecords.push(record)
    })

    const locationsQuerySnapshot = await db.collection("locations").get()
    for (const doc of locationsQuerySnapshot.docs) {
      const document = doc.data()
      const country = await document.country.get()
      document.country = country.data().name
      const record = algoliaHelpers.flattenLocation(doc.id, document)
      locationRecords.push(record)
    }

    const itemsIndex = algoliaHelpers.getIndex("items")
    const locationsIndex = algoliaHelpers.getIndex("locations")

    const saveItems = await itemsIndex.saveObjects(itemRecords)
    const saveLocations = await locationsIndex.saveObjects(locationRecords)

    res.status(200).send({
      items: saveItems,
      locations: saveLocations,
    })
  }
)
