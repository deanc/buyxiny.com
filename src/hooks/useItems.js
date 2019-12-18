import React, { useEffect } from "react"
import firebase from "../store/firebase"

const useItems = () => {
  const [error, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [items, setItems] = React.useState([])

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("items")
      .onSnapshot(
        snapshot => {
          setLoading(false)
          const items = []
          snapshot.forEach(doc => {
            items.push({ ...doc.data(), id: doc.id })
          })
          setItems(items)
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
    items,
  }
}

export default useItems
