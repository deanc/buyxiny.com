const axios = require("axios")

exports.pingNetlify = hookUrl =>
  axios
    .post(hookUrl)
    .then(res => {
      //console.log(`statusCode: ${res.statusCode}`)
      console.log(res)
      return true
    })
    .catch(error => {
      console.error(error)
    })
