import React, { useState, useEffect, useRef } from "react";
import { Device } from "twilio-client";
import Dialler from "./Dialler";
import KeypadButton from "./KeypadButton";
import "./Phone.css";

const Phone = ({ token }) => {
  const [status, setStatus] = useState("Connecting");
  const [number, setNumber] = useState("");
  const deviceRef = useRef(null);

  useEffect(() => {
    const device = new Device();
    deviceRef.current = device;

    device.setup(token, { debug: true });

    device.on("ready", () => {
      setStatus("Ready");
    });
    device.on("connect", () => {
      setStatus("On call");
    });
    device.on("disconnect", () => {
      setStatus("Ready");
    });

    return () => {
      device.destroy();
      deviceRef.current = null;
      setStatus("Offline");
    };
  }, [token]);

  const handleMainButtonClick = () => {
    if (status === "On call") {
      deviceRef.current.disconnectAll();
    } else {
      deviceRef.current.connect({ To: number });
    }
  };

  return (
    <>
      <Dialler number={number} setNumber={setNumber}></Dialler>
      <div className="call">
        <KeypadButton handleClick={handleMainButtonClick} color="green">
          {status === "On call" ? "Hang up" : "Call"}
        </KeypadButton>
      </div>
      <p className="status">{status}</p>
    </>
  );
};

export default Phone;
