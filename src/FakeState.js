import React from "react";
import states from "./states";
import "./FakeState.css";

const FakeState = ({ currentState, setState, setConn }) => {
  const handleChange = event => {
    const newState = states[event.target.value];
    setState(newState);
    if (newState === states.INCOMING || newState === states.ON_CALL) {
      setConn(true);
    } else {
      setConn(null);
    }
  };

  const checkboxes = Object.keys(states).map(stateKey => {
    return (
      <>
        <label htmlFor={stateKey}>{states[stateKey]}</label>
        <input
          type="radio"
          name="fake-state"
          value={stateKey}
          id={stateKey}
          checked={currentState === states[stateKey]}
          onChange={handleChange}
        ></input>
      </>
    );
  });

  return <div className="fake-state">{checkboxes}</div>;
};

export default FakeState;
