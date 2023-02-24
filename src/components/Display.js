import React from "react";
import "../styles/Display.css";

export default function Display(props) {
  return (
    <div className="displayContainer">
      <h2>{props.date}</h2>
      {/* {props.value.map((val, i) => (
        <h3>value is: {val}</h3>
      ))} */}
      <h3>value is: {props.value}</h3>
      <h3>
        time is :{props.time}, testing is:{" "}
        {/* {props.testing.coordinates[0].dates[0].value} */}
      </h3>
    </div>
  );
}
