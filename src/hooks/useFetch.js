import { useState, useEffect } from "react";

// Hook used to fetch apis
function useFetch(url) {
  const username = "test_dhindsa";
  const password = "mhV7foVY80";
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //   const [token, setToken] = useState(null);

  // EXAMPLE API RETURN
  //   {
  //     "version":"3.0",
  //     "user":"test_dhindsa",
  //     "dateGenerated":"2023-02-22T19:28:30Z",
  //     "status":"OK",
  //     "data":[
  //         {
  //             "parameter":"t_4m:C",
  //             "coordinates":[
  //                 {
  //                 "lat":51.507322,
  //                 "lon":-0.127647,
  //                 "dates":[{
  //                     "date":"2023-02-22T19:25:00Z",
  //                     "value":5.6
  //                 }]},
  //                 {"lat":48.853495,
  //                 "lon":2.348392,
  //                 "dates":[{
  //                     "date":"2023-02-22T19:25:00Z",
  //                     "value":8.8
  //                 }]}
  //             ]
  //         }
  //     ]
  // }

  useEffect(() => {
    setLoading(true);

    // First have to fetch Token for AUTH
    // ---------------------------
    // CODE FOR GETTING AUTH TOKEN
    // fetch("https://login.meteomatics.com/api/v1/token", {
    //   credentials: "include",
    //   method: "GET",
    //   headers: new Headers({
    //     Authorization: "Basic " + btoa(username + ":" + password),
    //   }),
    // })
    //   .then(function (resp) {
    //     return resp.json();
    //   })
    //   .then(function (data) {
    //     setToken(data.access_token);
    //     console.log("token", token);
    //   })
    //   .catch(function (err) {
    //     setError(err);
    //     console.log("something went wrong", err);
    //   });

    // After Getting Token then can fetch for data

    const getData = async () => {
      try {
        const response = await fetch(url, {
          credentials: "include",
          method: "GET",
          headers: new Headers({
            Authorization: "Basic " + btoa(username + ":" + password),
          }),
        });
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();
        setData(actualData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
