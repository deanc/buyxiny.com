import React, { useEffect } from "react";
import firebase from "../store/firebase";

const useCountries = () => {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [countries, setCountries] = React.useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("countries")
      .onSnapshot(
        snapshot => {
          setLoading(false);
          const countries = [];
          snapshot.forEach(doc => {
            countries.push({ ...doc.data(), id: doc.id });
          });
          console.log(countries);
          setCountries(countries);
        },
        err => {
          console.log(err);
          setError(err);
        }
      );

    return () => unsubscribe();
  }, []);

  return {
    error,
    loading,
    countries
  };
};

export default useCountries;
