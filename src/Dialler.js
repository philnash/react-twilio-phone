import React from "react";

const Dialler = ({ number, setNumber }) => {
  const handleNumberChange = event => {
    setNumber(event.target.value);
  };

  const handleNumberPressed = newNumber => {
    return () => {
      setNumber(`${number}${newNumber}`);
    };
  };

  return (
    <div>
      <input type="tel" value={number} onChange={handleNumberChange} />
      <ol>
        <li>
          <button onClick={handleNumberPressed("1")}>1</button>
        </li>
        <li>
          <button onClick={handleNumberPressed("2")}>2</button>
        </li>
        <li>
          <button onClick={handleNumberPressed("3")}>3</button>
        </li>
        <li>
          <button onClick={handleNumberPressed("4")}>4</button>
        </li>
        <li>
          <button onClick={handleNumberPressed("5")}>5</button>
        </li>
        <li>
          <button onClick={handleNumberPressed("6")}>6</button>
        </li>
        <li>
          <button onClick={handleNumberPressed("7")}>7</button>
        </li>
        <li>
          <button onClick={handleNumberPressed("8")}>8</button>
        </li>
        <li>
          <button onClick={handleNumberPressed("9")}>9</button>
        </li>
        <li>
          <button onClick={handleNumberPressed("0")}>0</button>
        </li>
        <li>
          <button onClick={handleNumberPressed("+")}>+</button>
        </li>
      </ol>
    </div>
  );
};

export default Dialler;
