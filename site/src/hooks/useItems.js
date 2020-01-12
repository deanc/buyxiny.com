import React, { useEffect } from "react"
import firebase from "../store/firebase"

const useItems = type => {
  const [error, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [items, setItems] = React.useState([])

  const handleSnapshot = snapshot => {
    setLoading(false)
    const items = []
    snapshot.forEach(doc => {
      items.push({ ...doc.data(), id: doc.id })
    })
    console.log(items.map(item => item.name))
    setItems(items)
  }

  const handleError = err => {
    console.log(err)
    setError(err)
  }

  useEffect(() => {
    let unsubscribe = () => {}
    if (type) {
      unsubscribe = firebase
        .firestore()
        .collection("items")
        .where("type", "==", type)
        .where("active", "==", true)
        .orderBy("name")
        .onSnapshot(handleSnapshot, handleError)
    } else {
      unsubscribe = firebase
        .firestore()
        .collection("items")
        .where("active", "==", true)
        .orderBy("name")
        .onSnapshot(handleSnapshot, handleError)
    }

    return () => unsubscribe()
  }, [type])

  return {
    error,
    loading,
    items,
  }
}

export default useItems
