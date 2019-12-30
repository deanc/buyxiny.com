import React, { useEffect } from "react"
import firebase from "../store/firebase"
import config from "../config/general.json"

const useCountries = () => {
  const [error, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [countries, setCountries] = React.useState([])

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("countries")
      .onSnapshot(
        snapshot => {
          setLoading(false)
          const countries = []
          snapshot.forEach(doc => {
            const data = doc.data()
            if (config.validCountries.includes(data.slug)) {
              countries.push({ ...data, id: doc.id })
            }
          })
          setCountries(countries)
        },
        err => {
          console.log(err)
          setError(err)
        }
      )

    return () => unsubscribe()
  }, [])

  return {
    error,
    loading,
    countries,
  }
}

export default useCountries
