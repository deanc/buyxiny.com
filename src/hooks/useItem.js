import React, { useEffect } from "react"
import firebase from "../store/firebase"

const useItem = id => {
  const [error, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [item, setItem] = React.useState([])

  const firestore = firebase.firestore()

  useEffect(() => {
    const unsubscribeItem = firestore
      .collection("items")
      .doc(id)
      .onSnapshot(
        snapshot => {
          setLoading(false)
          if (!snapshot.exists) {
            setItem(null)
          } else {
            const data = snapshot.data()
            if (data.locations && data.locations.length) {
              const locationPromises = []
              data.locations.forEach(loc => {
                locationPromises.push(
                  firestore
                    .collection("locations")
                    .doc(loc.id)
                    .get()
                    .then(locationSnapshot => {
                      if (locationSnapshot.exists) {
                        return locationSnapshot.data()
                      }
                      return []
                    })
                )
              })

              Promise.all(locationPromises).then(res => {
                setItem({
                  ...snapshot.data(),
                  id: snapshot.id,
                  locations: res,
                })
              })
            } else {
              setItem({
                ...snapshot.data(),
                id: snapshot.id,
              })
            }
          }
        },
        err => {
          console.log(err)
          setError(err)
        }
      )

    return () => unsubscribeItem()
  }, [firestore, id])

  return {
    error,
    loading,
    item,
  }
}

export default useItem
