import React from "react";
import "../styles/Header.css";

export default function Header() {
  return (
    <div className="headerContainer">
      <div id="background-wrap">
        <div class="x1">
          <div class="cloud"></div>
        </div>

        <div class="x2">
          <div class="cloud"></div>
        </div>

        <div class="x3">
          <div class="cloud"></div>
        </div>

        <div class="x4">
          <div class="cloud"></div>
        </div>

        <div class="x5">
          <div class="cloud"></div>
        </div>
      </div>
      <header className="headerContent">
        <h1>Vinter Weather app</h1>
      </header>
    </div>
  );
}
