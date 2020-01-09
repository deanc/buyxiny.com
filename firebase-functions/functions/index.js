// functions helpers
const functions = require("firebase-functions")

// set up firebase admin
const admin = require("firebase-admin")
admin.initializeApp()
const db = admin.firestore()

// helpers
const algoliaHelpers = require("./helpers/algolia")
const netlifyHelpers = require("./helpers/netlify")
const firestoreHelpers = require("./helpers/firestore")

// config
const collectionsToMonitor = ["items", "locations"]

// libraries
const cors = require("cors")({ origin: true })
const slugify = require("slugify")

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

exports.addItem = functions.https.onRequest(async (req, res) => {
  cors(req, res, () => {
    if (req.method !== "POST") {
      return res.status(405).send({
        error: "Invalid HTTP method.",
      })
    }

    const formData = req.body

    // basic validation for now
    if (
      Object.keys(formData).length &&
      formData.type &&
      formData.item_name &&
      (formData.location_name || formData.location_ref) &&
      (formData.url || formData.address) &&
      formData.country_ref
    ) {
      const itemObject = firestoreHelpers.createItemObject(formData)

      // if we are handling a new location let's add it first
      if (!formData.location_ref || !formData.location_ref.length) {
        const locationObject = firestoreHelpers.createLocationObject(
          formData,
          db.doc("countries/" + formData.country_ref)
        )
        firestoreHelpers
          .addLocation(db, locationObject)
          .then(locationRef => {
            firestoreHelpers
              .addItem(db, itemObject, locationRef.id)
              .then(itemRef => {
                res.status(200).send({
                  itemRef: itemRef.id,
                  locationRef: locationRef.id,
                })
              })
              .catch(e => {
                console.log(e)
                res.status(500).send({
                  error: "Could not save new item with new location",
                })
              })
          })
          .catch(e => {
            console.log(e)
            res.status(500).send({
              error: "Could not save new location",
            })
          })
      } else {
        firestoreHelpers
          .addItem(db, itemObject, formData.location_ref)
          .then(itemRef => {
            res.status(200).send({
              itemRef: itemRef.id,
            })
          })
          .catch(e => {
            console.log(e)
            res.status(500).send({
              error: "Could not save item with existing location",
            })
          })
      }
    } else {
      res.status(400).send({
        error: "Some fields are empty...",
      })
    }
  })
})

exports.addLocationToItem = functions.https.onRequest(async (req, res) => {
  cors(req, res, () => {
    if (req.method !== "POST") {
      return res.status(405).send({
        error: "Invalid HTTP method.",
      })
    }

    const formData = req.body

    // basic validation for now
    if (!formData.item_ref) {
      return res.status(400).send({
        error: "Missing param item_ref",
      })
    }

    // simplest case is item ref + location ref
    if (formData.item_ref && formData.location_ref) {
      db.collection("items")
        .doc(formData.item_ref)
        .update({
          locations: admin.firestore.FieldValue.arrayUnion(
            db.doc("locations/" + formData.location_ref)
          ),
        })
      res.status(200).send({})
    }
    // otherwise add the location add to item
    else {
      if (
        !formData.country_ref ||
        !formData.location_name ||
        (!formData.url && !formData.address)
      ) {
        return res.status(400).send({
          error: "Missing new location fields",
        })
      }

      const locationObject = firestoreHelpers.createLocationObject(
        formData,
        db.doc("countries/" + formData.country_ref)
      )
      firestoreHelpers
        .addLocation(db, locationObject)
        .then(locationRef => {
          db.collection("items")
            .doc(formData.item_ref)
            .update({
              locations: admin.firestore.FieldValue.arrayUnion(
                db.doc("locations/" + locationRef.id)
              ),
            })
          res.status(200).send({
            locationRef: locationRef.id,
          })
        })
        .catch(e => {
          console.log(e)
          res.status(500).send({
            error: "Could not save new location",
          })
        })
    }
  })
})
