import React, { useState, useEffect } from "react";
import "./BackgroundImages.css";

export default function BackgroundImages() {
  let [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollTop(window.pageYOffset);
    });
  }, []);

  return (
    <div className="BackgroundImages">
      <div className="bg-image-bottom"></div>
      <div
        className="bg-image-right"
        style={{ top: +Math.round(scrollTop / 3 + 272).toString() + "px" }}
      ></div>
      <div
        className="bg-image-left"
        style={{ top: +Math.round(scrollTop / 3 + 400).toString() + "px" }}
      ></div>
    </div>
  );
}
