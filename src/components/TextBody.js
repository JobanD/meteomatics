import React from "react";

export default function TextBody(props) {
  return (
    <div className="selectedInfoContainer">
      <div className="selectedInfo">
        <h3>Date Range: </h3>
        <p>
          {props.date.replaceAll("-", "/")}
          {""}
          {props.endDate.length
            ? " - " + props.endDate.replaceAll("-", "/")
            : ""}
        </p>
      </div>
      <div className="selectedInfo">
        <h3>Time: </h3>
        <p>{props.time.slice(1, 6)}</p>
      </div>
      <div className="selectedInfo">
        <h3>Parameters:</h3>
      </div>
      <div className="buttonContainer">
        {props.type.map((t) => (
          <button
            className="toggleLabel button"
            onClick={() => props.handleClick(t)}
            value={t.value}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
