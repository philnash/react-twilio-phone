import React, { useState, useEffect } from "react";
import KeypadButton from "./KeypadButton";
import useLoudness from "./hooks/useLoudness";
import "./OnCall.css";

const useMuteWarning = (loudness, running) => {
  const [showMuteWarning, setShowMuteWarning] = useState(false);

  useEffect(() => {
    if (loudness > 6 && running) {
      setShowMuteWarning(true);
    }
  }, [loudness, running]);

  useEffect(() => {
    let timeout;
    if (showMuteWarning) {
      timeout = setTimeout(() => {
        setShowMuteWarning(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [showMuteWarning]);

  return [showMuteWarning];
};

const OnCall = ({ handleHangup, connection }) => {
  const [muted, setMuted] = useState(false);
  const [running, setRunning, loudness] = useLoudness();
  const [showMuteWarning] = useMuteWarning(loudness, running);

  const handleMute = () => {
    // connection.mute(!muted);
    setMuted(!muted);
    setRunning(!muted);
  };

  const muteWarning = (
    <p className="warning">Are you speaking? You are on mute!</p>
  );

  return (
    <>
      {showMuteWarning && muteWarning}
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
    </>
  );
};

export default OnCall;
