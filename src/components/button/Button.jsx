import React from "react";
import "./Button.css";

export default function Button({text, type = "button", onClick, img,...props }) {
  return (
    <button className="comp-button" type={type} onClick={onClick} {...props}>
      {text}
      {img && <img src={img} alt={text} />}
    </button>
  );
}


