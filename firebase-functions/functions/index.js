const functions = require("firebase-functions")
const axios = require("axios")

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.firestoreChangeListener = functions.firestore
  .document("items/{itemId}")
  .onWrite((change, context) => {
    const netlifyHook = functions.config().netlify.buildhook

    return axios
      .post(netlifyHook)
      .then(res => {
        //console.log(`statusCode: ${res.statusCode}`)
        console.log(res)
        return true
      })
      .catch(error => {
        console.error(error)
      })
  })
