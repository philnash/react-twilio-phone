import React, { useState } from "react";
import KeypadButton from "./KeypadButton";
import "./OnCall.css";

const OnCall = ({ handleHangup, connection }) => {
  const [muted, setMuted] = useState(false);

  const handleMute = () => {
    // connection.mute(!muted);
    setMuted(!muted);
  };

  return (
    <div className="call">
      <div className="call-options">
        <KeypadButton handleClick={handleMute} color={muted ? "red" : ""}>
          {muted ? "Unmute" : "Mute"}
        </KeypadButton>
      </div>
      <div className="hang-up">
        <KeypadButton handleClick={handleHangup} color="red">
          Hang up
        </KeypadButton>
      </div>
    </div>
  );
};

export default OnCall;
