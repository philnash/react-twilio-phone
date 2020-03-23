import React, { useState } from "react";
import KeypadButton from "./KeypadButton";

const OnCall = ({ handleHangup, connection }) => {
  const [muted, setMuted] = useState(false);

  const handleMute = () => {
    connection.mute(!muted);
    setMuted(!muted);
  };

  return (
    <div className="call">
      <KeypadButton handleClick={handleMute}>
        {muted ? "Unmute" : "Mute"}
      </KeypadButton>
      <KeypadButton handleClick={handleHangup} color="red">
        Hang up
      </KeypadButton>
    </div>
  );
};

export default OnCall;
