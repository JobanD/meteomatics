import { useState } from "react";
import useFetch from "../hooks/useFetch";
import "../styles/Body.css";
import Form from "./Form";
import Display from "./Display";

export default function Body() {
  // states to manage set with default parameters from Windsor, Ontario, Canada
  // set new values using form
  const [latitude, setLatitude] = useState(42.317432); // default values set to Windsor, Ontario, Canada
  const [longitude, setLongitude] = useState(-83.026772);
  const [date, setDate] = useState("2023-03-25");
  const [endDate, setEndDate] = useState("2023-04-06");
  const [time, setTime] = useState("14:25");
  const [parameter, setParameter] = useState([
    { key: 0, value: "t_2m:C", label: "Temperature (C)" },
    { key: 1, value: "relative_humidity_2m:p", label: "Humidity (Pa)" },
  ]);

  // form data function to get data from Form component
  // Used to make API call given user parameters
  const getFormData = (data) => {
    setLatitude(data.latitude);
    setLongitude(data.longitude);
    setDate(data.date);
    setTime(data.time);
    let paramData = data.parameter.map((param, i) => {
      return {
        key: i,
        value: param.value,
        label: param.label,
      };
    });
    setParameter(paramData); // First empty out parameters before appending array of objects of new parameters
    setEndDate(data.endDate);
  };

  // set data from api call
  // API call built with user given parameters returns JSON
  const { data, loading, error } = useFetch(
    // https://api.meteomatics.com/2023-02-22T19:25:00Z/t/51.507322,-0.127647/json
    // "https://api.meteomatics.com/2023-02-22T14:25:00.000-05:00/t_4m:C/51.5073219,-0.1276474+48.8534951,2.3483915/json?"
    "https://api.meteomatics.com/" +
      date +
      "T" +
      time +
      ":00.000-05:00" +
      `${
        endDate.length ? "--" + endDate + "T" + time + ":00.000-05:00:P1D" : ""
      }` +
      "/" +
      parameter.map((param) => param.value).join(",") + // pass in comma seperated list of parameters
      "/" +
      latitude +
      "," +
      longitude +
      "/json?"
  );

  // loading screen, add more if time
  if (loading) return <h1>Loading...</h1>;

  if (error) console.log(error);

  // main data returned from api, contains the actual measurements for requested parameters
  const valueData = data?.data;

  return (
    <div className="bodyContainer">
      <Form getFormData={getFormData} />
      {/* Display Component includes the data visualization objects, listed below parameters */}
      <Display
        data={valueData}
        latitude={latitude}
        longitude={longitude}
        date={date}
        endDate={endDate}
        time={time}
        type={parameter}
      />
    </div>
  );
}
