import React from "react";
import "./KeypadButton.css";

const KeypadButton = ({ children, handleClick, color = "" }) => {
  return (
    <button className={`keypad-button ${color}`} onClick={handleClick}>
      {children}
    </button>
  );
};

export default KeypadButton;
