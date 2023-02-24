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
  const [date, setDate] = useState("2023-02-25");
  const [endDate, setEndDate] = useState("");
  const [time, setTime] = useState("T14:25:00.000-05:00");
  const [parameter, setParameter] = useState([
    { key: 0, value: "t_2m:C", label: "Temperature (C)" },
  ]);
  //   const [formData, setFormData] = useState("");

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
      time +
      `${endDate.length ? "--" + endDate + time : ""}` +
      "/" +
      parameter.map((param) => param.value).join(",") + // pass in comma seperated list of parameters
      "/" +
      latitude +
      "," +
      longitude +
      "/json?"
  );

  if (loading) return <h1>Loading...</h1>;

  if (error) console.log(error);

  //   console.log("data is: " + JSON.stringify(data.data[0].coordinates[0]));
  console.log("DATA");
  console.log(JSON.stringify(data));
  console.log("ENDDATE");
  console.log(endDate);
  console.log("PARAM");
  console.log(parameter.map((param) => param.value).join(","));

  return (
    <div className="bodyContainer">
      <Display
        latitude={latitude}
        longitude={longitude}
        date={date}
        time={time}
        parameter={parameter.map((param) => param.value)}
        // value={data?.data[0].coordinates[0].dates[0].value} // passes values of given parameters
        value={data?.coordinates[0].dates.map((d) => d.value)} // passes values of given parameters
        // testing={data?.data[0]}
      />
      <Form getFormData={getFormData} />
      <p>TESTING: {data?.coordinates[0].dates[0].value}</p>
      <h2>{latitude}</h2>
      <h2>{longitude}</h2>
    </div>
  );
}
