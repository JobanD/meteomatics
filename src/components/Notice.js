import React from "react";

export default function Notice() {
  return (
    <section className="noticeContainer selectedInfoContainer">
      <div className="noticeText">
        <h2>*IMPORTANT*</h2>
        <p>
          The API trial has expired so this website no longer retrieves data
          from the Meteomatics API
        </p>
        <p>
          I have instead included example images of how the site would function,
          also you view the{" "}
          <a href="https://github.com/JobanD/meteomatics">code</a> in my GitHub!
        </p>
      </div>
    </section>
  );
}
