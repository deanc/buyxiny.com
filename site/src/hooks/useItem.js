import React, { useEffect } from "react"
import firebase from "../store/firebase"

const useItem = id => {
  const [error, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [item, setItem] = React.useState(null)

  const firestore = firebase.firestore()

  useEffect(() => {
    if (!id) {
      setItem(null)
      setLoading(false)
      return
    }

    const unsubscribeItem = firestore
      .collection("items")
      .doc(id)
      .onSnapshot(
        snapshot => {
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
                        return { ...locationSnapshot.data(), ref: loc.id }
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
                setLoading(false)
              })
            } else {
              setItem({
                ...snapshot.data(),
                id: snapshot.id,
              })
              setLoading(false)
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
