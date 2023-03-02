import React from "react";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <div className="footerContainer">
      <p>
        This data is brought to you by the{" "}
        <a
          href="https://www.meteomatics.com/en/weather-api"
          target="_blank"
          rel="noopener noreferrer"
        >
          Meteomatics Weather API
        </a>
      </p>
    </div>
  );
}
